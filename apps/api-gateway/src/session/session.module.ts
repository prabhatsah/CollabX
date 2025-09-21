import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserOrgModule } from '../user-org/user-org.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [AuthModule, forwardRef(() => UserOrgModule), RedisModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
