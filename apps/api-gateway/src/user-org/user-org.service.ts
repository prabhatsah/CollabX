import { SERVICE_NAMES } from '@app/common';
import { ApiResponseDto } from '@app/common/dto/response.dto';
import {
  CreateUserAndOrgRequest,
  GetSessionRequest,
  GetUsersInOrgRequest,
  HealthCheckRequest,
  UpdateDefaultOrgRequest,
  USER_ORG_SERVICE_NAME,
  UserOrgServiceClient,
} from '@app/common/proto/user-org';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class UserOrgService implements OnModuleInit {
  private readonly logger = new Logger(UserOrgService.name);

  //gRPC client from proto
  private userOrgServiceClient: UserOrgServiceClient;

  constructor(
    @Inject(SERVICE_NAMES.USER_ORG_SERVICE) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userOrgServiceClient = this.client.getService<UserOrgServiceClient>(
      USER_ORG_SERVICE_NAME,
    );
  }

  async createUserAndOrg(createUserAndOrgRequest: CreateUserAndOrgRequest) {
    this.logger.log(
      `Request send to user-org service for signup with email: ${createUserAndOrgRequest.email}`,
    );

    const response = await lastValueFrom(
      this.userOrgServiceClient.createUserAndOrg(createUserAndOrgRequest),
    );

    return ApiResponseDto.success(
      response,
      'User & Organization created successfully',
    );
  }

  async getSession(request: GetSessionRequest) {
    this.logger.log(
      `Request send to user-org service to fetch session: ${request.authUserId}`,
    );

    const response = await lastValueFrom(
      this.userOrgServiceClient.getSession(request),
    );

    return response;
  }

  async getUsersInOrg(request: GetUsersInOrgRequest) {
    this.logger.log(
      `Fetching users in Organization: ${request.organizationId}`,
    );

    const response = await lastValueFrom(
      this.userOrgServiceClient.getUsersInOrg(request),
    );

    return response;
  }

  async updateDefaultOrg(request: UpdateDefaultOrgRequest) {
    this.logger.log(`Updating user default Org: ${request.organizationId}`);

    const response = await lastValueFrom(
      this.userOrgServiceClient.updateDefaultOrg(request),
    );

    return ApiResponseDto.success(response, 'Default organization changed');
  }

  async checkHealth() {
    const request: HealthCheckRequest = {};

    const response = await firstValueFrom(
      this.userOrgServiceClient.checkHealth(request),
    );

    return ApiResponseDto.success(response);
  }
}
