import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
