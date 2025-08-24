import { HealthCheckRequest, SERVICE_NAMES } from '@app/common';
import { ApiResponseDto } from '@app/common/dto/response.dto';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  CreateAuthUserRequest,
  LoginRequest,
  VerifyTokenRequest,
} from '@app/common/proto/auth';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  private authServiceClient: AuthServiceClient;

  constructor(@Inject(SERVICE_NAMES.AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async createAuthUser(request: CreateAuthUserRequest) {
    const response = await lastValueFrom(
      this.authServiceClient.createAuthUser(request),
    );

    return ApiResponseDto.success(response, 'User created successfully');
  }

  async login(request: LoginRequest) {
    this.logger.log(`Login request with email: ${request.email}`);
    const response = await lastValueFrom(this.authServiceClient.login(request));
    return ApiResponseDto.success(response, 'Logged-in successfully');
  }

  async verifyToken(request: VerifyTokenRequest) {
    this.logger.log(
      `Access token verification req send: ${request.accessToken}`,
    );

    const response = await lastValueFrom(
      this.authServiceClient.verifyToken(request),
    );

    this.logger.log(`Token verification res: ${response.authUserId}`);

    return response;
  }

  async checkHealth() {
    const request: HealthCheckRequest = {};

    const response = await firstValueFrom(
      this.authServiceClient.checkHealth(request),
    );

    return ApiResponseDto.success(response);
  }
}
