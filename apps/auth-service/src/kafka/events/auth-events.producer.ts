import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../kafka.service';
import { EventPayload } from '@app/common/interfaces';

@Injectable()
export class AuthEventsProducer {
  private readonly logger = new Logger(AuthEventsProducer.name);

  constructor(private readonly kafkaService: KafkaService) {}

  async loginSuccess(payload: EventPayload) {
    await this.kafkaService.emit('auth.login.success', {
      ...payload,
      event: 'Login',
      timestamp: new Date().toISOString(),
    });
  }

  async loginFailed(payload: {
    email: string;
    message: string;
    success: boolean;
  }) {
    await this.kafkaService.emit('auth.login.failed', {
      ...payload,
      event: 'Login',
      timestamp: new Date().toISOString(),
    });
  }
}
