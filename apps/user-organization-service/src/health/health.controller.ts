import { Controller } from '@nestjs/common';
import { HealthService } from './health.service';
import type { HealthCheckRequest } from '@app/common/proto/user-org';
import { GrpcMethod } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@app/common';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @GrpcMethod(SERVICE_NAMES.USER_ORG_SERVICE, 'CheckHealth')
  checkHealth(request: HealthCheckRequest) {
    return this.healthService.checkHealth(request);
  }
}
