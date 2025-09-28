import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Injectable()
export class UserOrgEventsProducer {
  private readonly logger = new Logger(UserOrgEventsProducer.name);

  constructor(private readonly kafkaService: KafkaService) {}

  async invitationCreated(payload) {
    await this.kafkaService.emit('invitation.created', {
      ...payload,
      event: 'Invitation Created',
      timestamp: new Date().toISOString(),
    });
  }

  async invitationAccepted(payload) {
    await this.kafkaService.emit('invitation.accepted', {
      ...payload,
      event: 'Invitation Accepted',
      timestamp: new Date().toISOString(),
    });
  }
}
