import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { PrismaModule } from '../database/prisma.module';
import { AuditController } from './audit.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
