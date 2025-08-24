import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { AuditEventsConsumer } from './events/consumers/auth-events.consumer';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],
  providers: [KafkaService, AuditEventsConsumer],
  exports: [KafkaService, AuditEventsConsumer],
})
export class KafkaModule {}
