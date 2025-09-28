import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PasswordService } from '../password/password.service';
import {
  CreateAuthUserRequest,
  CreateAuthUserResponse,
  LoginRequest,
  VerifyTokenRequest,
} from '@app/common';
import { type ClientGrpc, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { JwtTokenService } from '../jwt/jwt.service';
import { AuthEventsProducer } from '../kafka/events/auth-events.producer';
import {
  GetUserByAuthIdRequest,
  USER_ORG_SERVICE_NAME,
  UserOrgServiceClient,
} from '@app/common/proto/user-org';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  //gRPC client from proto
  private userOrgServiceClient: UserOrgServiceClient;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly authEvents: AuthEventsProducer,
    @Inject(USER_ORG_SERVICE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userOrgServiceClient = this.client.getService<UserOrgServiceClient>(
      USER_ORG_SERVICE_NAME,
    );
  }

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
    console.log('Password:--------------', password);

    const authUser = await this.validateCredentials(email, password, meta);

    // Update last login
    await this.prismaService.authUser.update({
      where: { id: authUser.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens with organization context
    const tokens = await this.jwtTokenService.generateTokens(authUser.id);

    this.logger.debug(
      `Log-in success with access-token: ${tokens.accessToken} `,
    );

    //emiting event
    const userInfo = await this.getUserByAuthUserId({
      authUserId: authUser.id,
    });
    await this.authEvents.loginSuccess({
      userId: userInfo.user?.userId,
      orgId: userInfo.user?.defaultOrgId,
      // email: authUser.email,
      // fullName: userInfo.user?.fullName,
      // organizations: userInfo.user?.memberships,
      message: 'Login success',
      success: true,
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

  async getUserByAuthUserId(request: GetUserByAuthIdRequest) {
    const res$ = this.userOrgServiceClient.getUserByAuthId(request);
    const res = await lastValueFrom(res$);

    this.logger.debug(`User info res: ${JSON.stringify(res)}`);
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
        email: email,
        message: 'Invalid credentials',
        success: false,
        ...meta,
      });

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'Invalid email',
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
        message: 'Invalid password',
        success: false,
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
