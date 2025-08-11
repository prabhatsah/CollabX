import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { CurrentUser, JwtAuthGuard } from "@app/common";
import { MessagePattern } from "@nestjs/microservices";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { LogoutDto } from "./dto/logout.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { ResendVerificationDto } from "./dto/resend-verification.dto";
import { SelectOrganizationDto } from "./dto/select-organization.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create authentication credentials",
    description:
      "Creates auth_user record with email/password. Does not create business user profile.",
  })
  @ApiResponse({
    status: 201,
    description: "Authentication credentials created successfully",
    schema: {
      example: {
        authUserId: "clxxxxx",
        email: "user@example.com",
        isEmailVerified: false,
        accessToken: "jwt_token_here",
        refreshToken: "refresh_token_here",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Email already exists or validation error",
  })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Authenticate user with email/password" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    schema: {
      example: {
        authUserId: "clxxxxx",
        email: "user@example.com",
        accessToken: "jwt_token_here",
        refreshToken: "refresh_token_here",
      },
    },
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token using refresh token" })
  @ApiResponse({ status: 200, description: "Token refreshed successfully" })
  @ApiResponse({ status: 401, description: "Invalid or expired refresh token" })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Logout user and invalidate tokens" })
  @ApiResponse({ status: 200, description: "Logout successful" })
  async logout(
    @Body() logoutDto: LogoutDto,
    @CurrentUser("id") authUserId: string
  ) {
    return this.authService.logout(authUserId, logoutDto.refreshToken);
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Request password reset token" })
  @ApiResponse({
    status: 200,
    description: "Reset instructions sent if email exists",
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset password using token" })
  @ApiResponse({ status: 200, description: "Password reset successful" })
  @ApiResponse({ status: 400, description: "Invalid or expired token" })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post("verify-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify email using verification token" })
  @ApiResponse({ status: 200, description: "Email verified successfully" })
  @ApiResponse({ status: 400, description: "Invalid verification token" })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post("resend-verification")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend email verification token" })
  @ApiResponse({
    status: 200,
    description: "Verification email sent if user exists",
  })
  async resendVerification(@Body() resendDto: ResendVerificationDto) {
    return this.authService.resendVerification(resendDto);
  }

  @Post("select-organization")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Select organization after initial login" })
  @ApiResponse({
    status: 200,
    description: "Organization selected and login completed",
    schema: {
      example: {
        success: true,
        data: {
          authUserId: "clxxxxx",
          email: "user@example.com",
          selectedOrganization: {
            organizationId: "org_123",
            organizationName: "Acme Corp",
            role: "ADMIN",
          },
          accessToken: "jwt_token_here",
          refreshToken: "refresh_token_here",
        },
        message: "Login completed successfully",
      },
    },
  })
  @ApiResponse({ status: 401, description: "Invalid user or organization" })
  async selectOrganization(@Body() selectOrgDto: SelectOrganizationDto) {
    return this.authService.selectOrganization(selectOrgDto);
  }

  // =============================================================================
  // MICROSERVICE MESSAGE PATTERNS (for internal service communication)
  // =============================================================================

  // @MessagePattern("auth.validate_token")
  // async validateTokenPattern(data: { token: string }) {
  //   return this.authService.validateTokenPattern(data);
  // }

  // @MessagePattern("auth.verify_credentials")
  // async verifyCredentialsPattern(data: { email: string; password: string }) {
  //   return this.authService.verifyCredentialsPattern(data);
  // }

  // @MessagePattern("auth.generate_tokens")
  // async generateTokensPattern(data: { authUserId: string; email: string }) {
  //   return this.authService.generateTokensPattern(data);
  // }

  // @MessagePattern("auth.invalidate_user_tokens")
  // async invalidateUserTokensPattern(data: { authUserId: string }) {
  //   try {
  //     await this.authService.invalidateAllUserTokens(data.authUserId);
  //     return { success: true };
  //   } catch (error) {
  //     return { success: false, error: error.message };
  //   }
  // }

  // @MessagePattern("auth.get_user_by_id")
  // async getUserByIdPattern(data: { authUserId: string }) {
  //   try {
  //     const user = await this.prisma.authUser.findUnique({
  //       where: { id: data.authUserId },
  //       select: {
  //         id: true,
  //         email: true,
  //         isEmailVerified: true,
  //         lastLoginAt: true,
  //         createdAt: true,
  //       },
  //     });

  //     if (!user) {
  //       return { found: false };
  //     }

  //     return {
  //       found: true,
  //       user: {
  //         authUserId: user.id,
  //         email: user.email,
  //         isEmailVerified: user.isEmailVerified,
  //         lastLoginAt: user.lastLoginAt,
  //         createdAt: user.createdAt,
  //       },
  //     };
  //   } catch (error) {
  //     return {
  //       found: false,
  //       error: error.message,
  //     };
  //   }
  // }
}
