import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MailConsumer } from './events/mail.consumer';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [KafkaService, MailConsumer],
  exports: [KafkaService, MailConsumer],
})
export class KafkaModule {}
