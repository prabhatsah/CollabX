import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { ApiResponseDto } from "@app/common";
import { LoginDto } from "./dto/login.dto";
import { v4 as uuidv4 } from "uuid";
import { InviteUserDto } from "./dto/invite-user.dto";
import { AcceptInviteDto } from "./dto/accept-invite.dto";
import { AuthEventsProducer } from "../kafka/producers/auth-events.producer";
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../notification/email.service";
import { JwtTokenService } from "libs/common/jwt/src/jwt.service";
import { PasswordService } from "../password/password.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtTokenService,
    private readonly authEventsProducer: AuthEventsProducer,
    private readonly emailService: EmailService,
    private readonly passwordService: PasswordService
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, fullName, organizationName, password } = signupDto;

    // Check if user already exists
    const existingUser = await this.db.authUser.findUnique({
      where: { email },
    });

    // If user exists, throw an error
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Hash password
    const passwordHash = await this.passwordService.hash(password);

    // Create new user
    const user = await this.db.authUser.create({
      data: {
        email,
        passwordHash,
      },
    });

    // Send welcome email
    //await this.emailService.sendWelcomeEmail(user.email);

    // Publish user signup event to create user and organization
    await this.authEventsProducer.publishUserSignup({
      userId: user.id,
      email: user.email,
      fullName,
      organizationName,
    });

    return ApiResponseDto.success(
      {
        userId: user.id,
        email: user.email,
      },
      "Account created successfully. Please check your email for verification."
    );
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.db.authUser.findUnique({
      where: { email },
    });

    if (
      !user ||
      !(await this.passwordService.compare(password, user.passwordHash))
    ) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Update last login
    await this.db.authUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate preliminary token (used for organization selection)
    const preliminaryToken = this.jwtService.generatePreliminary({
      sub: user.id,
      email: user.email,
    });

    // Publish login event
    await this.authEventsProducer.publishUserLogin({
      userId: user.id,
      email: user.email,
      loginTime: new Date(),
    });

    return ApiResponseDto.success(
      {
        preliminaryToken,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      "Login successful. Please select an organization."
    );
  }

  async generateOrgToken(userId: string, organizationId: string, role: string) {
    const user = await this.db.authUser.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const payload = {
      sub: userId,
      email: user.email,
      orgId: organizationId,
      role,
      type: "access",
    };

    const accessToken = this.jwtService.generate(payload);

    return ApiResponseDto.success(
      {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
        },
        organization: {
          id: organizationId,
        },
        role,
      },
      "Access token generated successfully"
    );
  }

  async inviteUser(inviteDto: InviteUserDto, invitedByUserId: string) {
    const { email, organizationId } = inviteDto;

    // Check if user already exists
    const existingUser = await this.db.authUser.findUnique({
      where: { email },
    });

    // Generate invitation token
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    const organizationName = "Demo Organization";

    // Store invitation
    const invitation = await this.db.invitationToken.create({
      data: {
        email,
        organizationId,
        invitedBy: invitedByUserId,
        token,
        expiresAt,
      },
    });

    // Send invitation email
    await this.emailService.sendInvitationEmail({
      email: email,
      organizationName: organizationId,
      inviteToken: token,
      invitedBy: invitedByUserId,
    });

    return ApiResponseDto.success(
      { invitationId: invitation.id },
      "Invitation sent successfully"
    );
  }

  async acceptInvite(acceptInviteDto: AcceptInviteDto) {
    const { token, password, fullName } = acceptInviteDto;

    // Find and validate invitation
    const invitation = await this.db.invitationToken.findUnique({
      where: { token },
    });

    if (!invitation || invitation.usedAt || invitation.expiresAt < new Date()) {
      throw new BadRequestException("Invalid or expired invitation token");
    }

    // Check if user already exists
    let user = await this.db.authUser.findUnique({
      where: { email: invitation.email },
    });

    if (!user) {
      // Create new user
      const passwordHash = await this.passwordService.hash(password);
      user = await this.db.authUser.create({
        data: {
          email: invitation.email,
          passwordHash,
          isEmailVerified: true,
        },
      });

      // Publish user creation event
      await this.authEventsProducer.publishUserSignup({
        userId: user.id,
        email: user.email,
        fullName,
        organizationName: "Demo Organization", // Will be handled by membership creation
      });
    }

    // Mark invitation as used
    await this.db.invitationToken.update({
      where: { id: invitation.id },
      data: { usedAt: new Date() },
    });

    // Publish membership creation event
    await this.authEventsProducer.publishMembershipCreated({
      userId: user.id,
      organizationId: invitation.organizationId,
      invitedBy: invitation.invitedBy,
      role: "MEMBER",
    });

    return ApiResponseDto.success(
      {
        userId: user.id,
        email: user.email,
      },
      "Invitation accepted successfully"
    );
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
