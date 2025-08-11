import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { PrismaService } from "../database/database.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { ResendVerificationDto } from "./dto/resend-verification.dto";

import { AuthEventsProducer } from "../kafka/producers/auth-events.producer";

import { ApiResponseDto } from "@app/common";
import { PasswordService } from "../password/password.service";
import { JwtTokenService } from "../jwt/jwt.service";
import { UserOrganizationClientService } from "../user-organziation-client/user-organziation-client.service";
import { SelectOrganizationDto } from "./dto/select-organization.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly authEventsProducer: AuthEventsProducer,
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly userOrgClient: UserOrganizationClientService
  ) {}

  // =============================================================================
  // PUBLIC AUTH OPERATIONS
  // =============================================================================

  async signup(signupDto: SignupDto) {
    const { email, password } = signupDto;

    // Check if user already exists
    const existingUser = await this.prisma.authUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Hash password
    const passwordHash = await this.passwordService.hash(password);

    // Generate verification token
    const verificationToken = this.passwordService.generateVerificationToken();

    // Create auth user
    const authUser = await this.prisma.authUser.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        verificationToken,
      },
    });

    this.logger.log(`Auth user created: ${authUser.id}`);

    // Publish user signup event to create user profile and organization
    await this.authEventsProducer.publishUserSignup({
      authUserId: authUser.id,
      email: authUser.email,
    });

    this.logger.log(`User signup event published for: ${authUser.email}`);

    return ApiResponseDto.success(
      {
        authUserId: authUser.id,
        email: authUser.email,
        isEmailVerified: authUser.isEmailVerified,
      },
      "Account created successfully. Please check your email for verification."
    );
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find and validate user credentials
    const authUser = await this.validateCredentials(email, password);

    // Check if email is verified
    if (!authUser.isEmailVerified) {
      throw new UnauthorizedException(
        "Please verify your email before logging in"
      );
    }

    // Get user's organizations
    // const userOrganizations = await this.userOrgClient.getUserOrganizations(
    //   authUser.id
    // );

    // if (!userOrganizations || userOrganizations.length === 0) {
    //   throw new UnauthorizedException("No organizations found for this user");
    // }

    let userOrganizations = [
      {
        organizationId: "org_1",
        organizationName: "Acme Corp",
        role: "ADMIN",
        isActive: true,
      },
      {
        organizationId: "org_2",
        organizationName: "Google",
        role: "SUPPORT",
        isActive: true,
      },
    ];

    // If user belongs to only one organization, auto-select it
    if (userOrganizations.length === 1) {
      const selectedOrg = userOrganizations[0];

      // Update last login
      await this.updateLastLogin(authUser.id);

      // Generate tokens with organization context
      const tokens = await this.jwtTokenService.generateTokensWithOrg(
        authUser.id,
        authUser.email,
        selectedOrg.organizationId,
        selectedOrg.role
      );

      this.logger.log(
        `User logged in to single org: ${authUser.email} -> ${selectedOrg.organizationName}`
      );

      // Publish user login event
      await this.authEventsProducer.publishUserLogin({
        authUserId: authUser.id,
        email: authUser.email,
        loginTime: new Date(),
      });

      return ApiResponseDto.success(
        {
          authUserId: authUser.id,
          email: authUser.email,
          isEmailVerified: authUser.isEmailVerified,
          selectedOrganization: selectedOrg,
          ...tokens,
        },
        "Login successful"
      );
    }

    // If user belongs to multiple organizations, return org list for selection
    this.logger.log(
      `User needs to select organization: ${authUser.email} (${userOrganizations.length} orgs)`
    );

    // Publish user login event
    await this.authEventsProducer.publishUserLogin({
      authUserId: authUser.id,
      email: authUser.email,
      loginTime: new Date(),
    });

    return ApiResponseDto.success(
      {
        authUserId: authUser.id,
        email: authUser.email,
        isEmailVerified: authUser.isEmailVerified,
        requiresOrganizationSelection: true,
        organizations: userOrganizations,
      },
      "Please select an organization to continue"
    );
  }

  async selectOrganization(selectOrgDto: SelectOrganizationDto) {
    const { authUserId, organizationId } = selectOrgDto;

    // Verify auth user exists
    const authUser = await this.prisma.authUser.findUnique({
      where: { id: authUserId },
    });

    if (!authUser) {
      throw new UnauthorizedException("Invalid user");
    }

    // Verify user belongs to this organization
    const selectedOrg = await this.userOrgClient.verifyUserOrganizationAccess(
      authUserId,
      organizationId
    );

    if (!selectedOrg) {
      throw new UnauthorizedException("You do not belong to this organization");
    }

    // Update last login
    await this.updateLastLogin(authUser.id);

    // Generate tokens with organization context
    const tokens = await this.jwtTokenService.generateTokensWithOrg(
      authUser.id,
      authUser.email,
      selectedOrg.organizationId,
      selectedOrg.role
    );

    this.logger.log(
      `User selected organization: ${authUser.email} -> ${selectedOrg.organizationName}`
    );

    return ApiResponseDto.success(
      {
        authUserId: authUser.id,
        email: authUser.email,
        selectedOrganization: selectedOrg,
        ...tokens,
      },
      "Login completed successfully"
    );
  }

  async refreshToken(refreshTokenDto: { refreshToken: string }) {
    const { refreshToken } = refreshTokenDto;

    // Verify and validate refresh token
    const storedToken = await this.jwtTokenService.validateRefreshToken(
      refreshToken
    );

    // Generate new tokens (preserve organization context if it exists)
    let newTokens;

    // Check if token has organization context
    const payload = this.jwtTokenService.decode(refreshToken) as any;

    if (payload.organizationId && payload.role) {
      // Regenerate with organization context
      newTokens = await this.jwtTokenService.generateTokensWithOrg(
        storedToken.user.id,
        storedToken.user.email,
        payload.organizationId,
        payload.role
      );
    } else {
      // Regenerate without organization context
      newTokens = await this.jwtTokenService.generateTokens(
        storedToken.user.id,
        storedToken.user.email
      );
    }

    // Remove old refresh token
    await this.jwtTokenService.invalidateRefreshToken(refreshToken);

    this.logger.log(`Tokens refreshed for user: ${storedToken.user.id}`);

    return ApiResponseDto.success(newTokens, "Token refreshed successfully");
  }

  async logout(authUserId: string, refreshToken: string) {
    await this.jwtTokenService.invalidateRefreshToken(refreshToken);
    this.logger.log(`User logged out: ${authUserId}`);

    return ApiResponseDto.success(null, "Logout successful");
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const authUser = await this.prisma.authUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Don't reveal if email exists (security best practice)
    if (!authUser) {
      return ApiResponseDto.success(
        null,
        "If email exists, reset instructions have been sent"
      );
    }

    // Generate reset token
    const resetToken = this.passwordService.generateResetToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

    // Update user with reset token
    await this.prisma.authUser.update({
      where: { id: authUser.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: expiresAt,
      },
    });

    // Publish password reset event for email notification, TODO
    // await this.authEventsProducer.publishPasswordResetRequested({
    //   authUserId: authUser.id,
    //   email: authUser.email,
    //   resetToken,
    // });

    this.logger.log(`Password reset requested for: ${authUser.email}`);

    return ApiResponseDto.success(
      null,
      "If email exists, reset instructions have been sent"
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    const authUser = await this.prisma.authUser.findUnique({
      where: { resetPasswordToken: token },
    });

    if (
      !authUser ||
      !authUser.resetPasswordExpiresAt ||
      authUser.resetPasswordExpiresAt < new Date()
    ) {
      throw new BadRequestException("Invalid or expired reset token");
    }

    // Hash new password
    const passwordHash = await this.passwordService.hash(newPassword);

    // Update password and clear reset token
    await this.prisma.authUser.update({
      where: { id: authUser.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
    });

    // Invalidate all existing refresh tokens for security
    await this.jwtTokenService.invalidateAllUserTokens(authUser.id);

    // Publish password reset success event, TODO
    // await this.authEventsProducer.publishPasswordResetCompleted({
    //   authUserId: authUser.id,
    //   email: authUser.email,
    // });

    this.logger.log(`Password reset completed for: ${authUser.email}`);

    return ApiResponseDto.success(null, "Password reset successful");
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { token } = verifyEmailDto;

    const authUser = await this.prisma.authUser.findUnique({
      where: { verificationToken: token },
    });

    if (!authUser) {
      throw new BadRequestException("Invalid verification token");
    }

    if (authUser.isEmailVerified) {
      return ApiResponseDto.success(null, "Email already verified");
    }

    // Mark email as verified
    await this.prisma.authUser.update({
      where: { id: authUser.id },
      data: {
        isEmailVerified: true,
        verificationToken: null,
      },
    });

    // Publish email verification event, TODO
    // await this.authEventsProducer.publishEmailVerified({
    //   authUserId: authUser.id,
    //   email: authUser.email,
    // });

    this.logger.log(`Email verified for: ${authUser.email}`);

    return ApiResponseDto.success(null, "Email verified successfully");
  }

  async resendVerification(resendDto: ResendVerificationDto) {
    const { email } = resendDto;

    const authUser = await this.prisma.authUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!authUser) {
      return ApiResponseDto.success(
        null,
        "If email exists, verification instructions have been sent"
      );
    }

    if (authUser.isEmailVerified) {
      return ApiResponseDto.success(null, "Email already verified");
    }

    // Generate new verification token
    const verificationToken = this.passwordService.generateVerificationToken();

    await this.prisma.authUser.update({
      where: { id: authUser.id },
      data: { verificationToken },
    });

    // Publish verification resend event, TODO
    // await this.authEventsProducer.publishVerificationResent({
    //   authUserId: authUser.id,
    //   email: authUser.email,
    //   verificationToken,
    // });

    this.logger.log(`Verification resent for: ${authUser.email}`);

    return ApiResponseDto.success(
      null,
      "If email exists, verification instructions have been sent"
    );
  }

  // =============================================================================
  // MICROSERVICE MESSAGE PATTERNS (for internal service communication)
  // =============================================================================

  // async validateTokenPattern(data: { token: string }) {
  //   try {
  //     const payload = await this.jwtTokenService.validateToken(data.token);
  //     return {
  //       valid: true,
  //       authUserId: payload.sub,
  //       email: payload.email,
  //       organizationId: payload.organizationId,
  //       role: payload.role,
  //       payload,
  //     };
  //   } catch (error) {
  //     return {
  //       valid: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // async verifyCredentialsPattern(data: { email: string; password: string }) {
  //   try {
  //     const authUser = await this.validateCredentials(
  //       data.email,
  //       data.password
  //     );
  //     return {
  //       valid: true,
  //       authUserId: authUser.id,
  //       email: authUser.email,
  //     };
  //   } catch (error) {
  //     return {
  //       valid: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // async generateTokensPattern(data: {
  //   authUserId: string;
  //   email: string;
  //   organizationId?: string;
  //   role?: string;
  // }) {
  //   try {
  //     let tokens;

  //     if (data.organizationId && data.role) {
  //       tokens = await this.jwtTokenService.generateTokensWithOrg(
  //         data.authUserId,
  //         data.email,
  //         data.organizationId,
  //         data.role
  //       );
  //     } else {
  //       tokens = await this.jwtTokenService.generateTokens(
  //         data.authUserId,
  //         data.email
  //       );
  //     }

  //     return {
  //       success: true,
  //       ...tokens,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // =============================================================================
  // INTERNAL HELPER METHODS (kept minimal)
  // =============================================================================

  private async validateCredentials(email: string, password: string) {
    const authUser = await this.prisma.authUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!authUser) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await this.passwordService.compare(
      password,
      authUser.passwordHash
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return authUser;
  }

  private async updateLastLogin(authUserId: string) {
    await this.prisma.authUser.update({
      where: { id: authUserId },
      data: { lastLoginAt: new Date() },
    });
  }

  // =============================================================================
  // ADMIN/CLEANUP METHODS (called by consumers)
  // =============================================================================

  async deleteAuthUser(authUserId: string) {
    // This should only be called when user creation fails
    await this.jwtTokenService.invalidateAllUserTokens(authUserId);

    await this.prisma.authUser.delete({
      where: { id: authUserId },
    });

    this.logger.log(`Auth user deleted: ${authUserId}`);
  }

  async updateEmailVerificationStatus(authUserId: string, isVerified: boolean) {
    await this.prisma.authUser.update({
      where: { id: authUserId },
      data: {
        isEmailVerified: isVerified,
        verificationToken: isVerified ? null : undefined,
      },
    });
  }

  // =============================================================================
  // HEALTH CHECK
  // =============================================================================

  async healthCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return ApiResponseDto.success(
        { database: "connected" },
        "Auth service is healthy"
      );
    } catch (error) {
      return ApiResponseDto.error("Database disconnected", [error.message]);
    }
  }
}
