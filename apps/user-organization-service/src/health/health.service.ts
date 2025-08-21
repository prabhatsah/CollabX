import {
  HealthCheckRequest,
  HealthCheckResponse,
} from '@app/common/proto/user-org';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth(healthCheckRequest: HealthCheckRequest): HealthCheckResponse {
    console.log('Health check service called in user-org health module');

    return {
      serviceUp: true,
      databaseConnected: true,
      dependenciesHealthy: true,
      statusMessage: 'User Organization service is up and runing...',
    };
  }
}
