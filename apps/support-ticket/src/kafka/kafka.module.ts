import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { TicketEventsProducer } from './events/ticket-events.producer';

@Module({
  providers: [KafkaService, TicketEventsProducer],
  exports: [KafkaService, TicketEventsProducer],
})
export class KafkaModule {}
