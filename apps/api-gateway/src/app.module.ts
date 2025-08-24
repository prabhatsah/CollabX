import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SignupModule } from './signup/signup.module';
import { HealthModule } from './health/health.module';
import { SessionModule } from './session/session.module';
import { AuthMiddleware } from './middleware/auth.middleware.ts.bak';
import { SessionService } from './session/session.service';
import { UserOrgService } from './user-org/user-org.service';
import { AuthService } from './auth/auth.service';
import { CommonModule } from './common/common.module';
import { AuditModule } from './audit/audit.module';
import { SupportTicketModule } from './support-ticket/support-ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SessionModule,
    SignupModule,
    HealthModule,
    CommonModule,
    AuditModule,
    SupportTicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
