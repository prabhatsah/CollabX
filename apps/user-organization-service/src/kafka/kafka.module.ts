import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { UserOrgEventsProducer } from './kafka.producer';

@Module({
  providers: [KafkaService, UserOrgEventsProducer],
  exports: [KafkaService, UserOrgEventsProducer],
})
export class KafkaModule {}
