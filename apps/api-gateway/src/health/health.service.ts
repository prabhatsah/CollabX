import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserOrgService } from '../user-org/user-org.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly authService: AuthService,
    private readonly userOrgService: UserOrgService,
  ) {}

  async checkHealth() {
    const healthData = {};
    const authHealth = await this.authService.checkHealth();
    healthData['auth-service'] = authHealth.data;

    const userOrgHealth = await this.userOrgService.checkHealth();
    healthData['user-Organization-service'] = userOrgHealth.data;

    return healthData;
  }
}
