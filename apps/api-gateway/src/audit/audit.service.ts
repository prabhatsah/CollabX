import { SERVICE_NAMES } from '@app/common';
import { ApiResponseDto } from '@app/common/dto/response.dto';
import {
  AUDIT_SERVICE_NAME,
  AuditServiceClient,
  GetLogsRequest,
} from '@app/common/proto/audit';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class AuditService implements OnModuleInit {
  private readonly logger = new Logger(AuditService.name);

  private auditServiceClient: AuditServiceClient;

  constructor(
    @Inject(SERVICE_NAMES.AUDIT_SERVICE) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.auditServiceClient =
      this.client.getService<AuditServiceClient>(AUDIT_SERVICE_NAME);
  }

  async getlogs(request: GetLogsRequest) {
    const response = await lastValueFrom(
      this.auditServiceClient.getLogs(request),
    );

    return response;
  }

  async checkHealth() {
    const response = await firstValueFrom(
      this.auditServiceClient.checkHealth({}),
    );

    return ApiResponseDto.success(response);
  }
}
