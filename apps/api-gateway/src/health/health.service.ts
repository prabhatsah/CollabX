import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserOrgService } from '../user-org/user-org.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly authService: AuthService,
    private readonly userOrgService: UserOrgService,
    private readonly auditService: AuditService,
  ) {}

  async checkHealth() {
    const healthData = {};
    const authHealth = await this.authService.checkHealth();
    healthData['auth-service'] = authHealth.data;

    const userOrgHealth = await this.userOrgService.checkHealth();
    healthData['user-Organization-service'] = userOrgHealth.data;

    const auditHealth = await this.auditService.checkHealth();
    healthData['audit-service'] = auditHealth.data;

    return healthData;
  }
}
