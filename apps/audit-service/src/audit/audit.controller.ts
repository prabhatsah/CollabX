import { Controller } from '@nestjs/common';
import { AuditService } from './audit.service';
import { GrpcMethod } from '@nestjs/microservices';

import {
  AUDIT_SERVICE_NAME,
  type GetLogsRequest,
} from '@app/common/proto/audit';

@Controller()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @GrpcMethod(AUDIT_SERVICE_NAME, 'GetLogs')
  async getLogs(request: GetLogsRequest) {
    const res = await this.auditService.getLogs(request);
    return res;
  }

  @GrpcMethod(AUDIT_SERVICE_NAME, 'CheckHealth')
  checkHealth() {
    return this.auditService.checkHealth();
  }
}
