import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { UserOrgModule } from '../user-org/user-org.module';

@Module({
  imports: [AuthModule, UserOrgModule],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
