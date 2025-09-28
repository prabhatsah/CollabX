import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SignupModule } from './signup/signup.module';
import { HealthModule } from './health/health.module';
import { SessionModule } from './session/session.module';
import { CommonModule } from './common/common.module';
import { AuditModule } from './audit/audit.module';
import { SupportTicketModule } from './support-ticket/support-ticket.module';
import { InvitationModule } from './invitation/invitation.module';

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
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
