import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { AuthEventsProducer } from './events/auth-events.producer';

@Module({
  providers: [KafkaService, AuthEventsProducer],
  exports: [KafkaService, AuthEventsProducer],
})
export class KafkaModule {}
