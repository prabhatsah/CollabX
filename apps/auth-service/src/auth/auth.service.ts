import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PasswordService } from '../password/password.service';
import {
  CreateAuthUserRequest,
  CreateAuthUserResponse,
  LoginRequest,
  VerifyTokenRequest,
} from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { JwtTokenService } from '../jwt/jwt.service';
import { AuthEventsProducer } from '../kafka/events/auth-events.producer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly authEvents: AuthEventsProducer,
  ) {}

  async signup(
    request: CreateAuthUserRequest,
  ): Promise<CreateAuthUserResponse> {
    const { email, password } = request;
    this.logger.log(`Auth user creation req with email: ${email}`);

    //Check if email is already used
    const existingUser = await this.prismaService.authUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      this.logger.error(`Email already exist: ${email}`);

      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'Email already exists',
      });
    }

    //Hash password
    const passwordHash = await this.passwordService.hash(password);

    //Generate verification token
    const verificationToken = this.passwordService.generateVerificationToken();

    //Create auth user
    const authUser = await this.prismaService.authUser.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        verificationToken,
      },
    });
    this.logger.log(`Auth user created: ${authUser.id}`);

    //Return response
    return {
      authUserId: authUser.id,
    };
  }

  async login(
    request: LoginRequest,
    meta: { ip?: string; userAgent?: string },
  ) {
    const { email, password } = request;

    const authUser = await this.validateCredentials(email, password, meta);

    // Update last login
    await this.prismaService.authUser.update({
      where: { id: authUser.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens with organization context
    const tokens = await this.jwtTokenService.generateTokens(authUser.id);

    this.logger.log(`log-in success with access-token: ${tokens.accessToken} `);

    //emiting event
    await this.authEvents.loginSuccess({
      userId: authUser.id,
      email: authUser.email,
      ...meta,
    });

    return tokens;
  }

  checkHealth() {
    return {
      serviceUp: true,
      databaseConnected: true,
      dependenciesHealthy: true,
      statusMessage: 'Auth service is up and running ...',
    };
  }

  async verifyToken(request: VerifyTokenRequest) {
    this.logger.log(`Token verification started: ${request.accessToken}`);

    const res = await this.jwtTokenService.validateToken(request.accessToken);
    this.logger.log(`Verification token belongs to: ${res.authUserId}`);

    return res;
  }

  //====================== Helper Functions =====================
  private async validateCredentials(email: string, password: string, meta) {
    const authUser = await this.prismaService.authUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!authUser) {
      this.logger.error(`Invalid credentials: ${email}`);

      await this.authEvents.loginFailed({
        email,
        reason: 'invalid_credentials',
        ...meta,
      });

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'Invalid credentials',
      });
    }

    const isPasswordValid = await this.passwordService.compare(
      password,
      authUser.passwordHash,
    );
    if (!isPasswordValid) {
      this.logger.error(`Invalid credentials: ${email}`);

      await this.authEvents.loginFailed({
        email,
        reason: 'invalid_credentials',
        ...meta,
      });

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'Invalid credentials',
      });
    }

    return authUser;
  }
}
