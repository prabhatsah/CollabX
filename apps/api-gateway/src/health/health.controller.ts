import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserOrgService } from '../user-org/user-org.service';
import { HealthService } from './health.service';

@Controller('healthCheck')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return this.healthService.checkHealth();
  }
}
