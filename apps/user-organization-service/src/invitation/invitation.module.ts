import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';

@Module({
  imports: [PrismaModule],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
