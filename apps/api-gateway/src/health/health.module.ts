import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { AuthModule } from '../auth/auth.module';
import { UserOrgModule } from '../user-org/user-org.module';

@Module({
  imports: [AuthModule, UserOrgModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
