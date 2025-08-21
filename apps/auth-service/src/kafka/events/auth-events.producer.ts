import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../kafka.service';

@Injectable()
export class AuthEventsProducer {
  private readonly logger = new Logger(AuthEventsProducer.name);

  constructor(private readonly kafkaService: KafkaService) {}

  async loginSuccess(payload: { userId: string; email: string }) {
    await this.kafkaService.emit('auth.login.success', {
      ...payload,
      timestamp: new Date().toISOString(),
    });
  }

  async loginFailed(payload: { userId: string; email: string }) {
    await this.kafkaService.emit('auth.login.failed', {
      ...payload,
      timestamp: new Date().toISOString(),
    });
  }
}
