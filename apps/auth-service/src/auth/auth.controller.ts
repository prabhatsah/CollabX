import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { InviteUserDto } from "./dto/invite-user.dto";
import { CurrentUser, JwtAuthGuard } from "@app/common";
import { AcceptInviteDto } from "./dto/accept-invite.dto";
import { MessagePattern } from "@nestjs/microservices";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ summary: "User signup" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post("login")
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Login successful" })
  async login(@Body() loginDto: LoginDto) {
    console.log("Login DTO:", loginDto);

    return this.authService.login(loginDto);
  }

  @Post("invite")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Invite user to organization" })
  async inviteUser(
    @Body() inviteDto: InviteUserDto,
    @CurrentUser("id") userId: string
  ) {
    return this.authService.inviteUser(inviteDto, userId);
  }

  @Post("accept-invite")
  @ApiOperation({ summary: "Accept invitation" })
  async acceptInvite(@Body() acceptInviteDto: AcceptInviteDto) {
    return this.authService.acceptInvite(acceptInviteDto);
  }

  @Get("validate")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Validate token" })
  async validateToken(@CurrentUser() user: any) {
    return { valid: true, user };
  }

  // Microservice patterns
  @MessagePattern("auth.generate_org_token")
  async generateOrgToken(data: {
    userId: string;
    organizationId: string;
    role: string;
  }) {
    return this.authService.generateOrgToken(
      data.userId,
      data.organizationId,
      data.role
    );
  }

  @MessagePattern("auth.validate_token")
  async validateTokenPattern(data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}
