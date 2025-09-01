import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../kafka.service';

@Injectable()
export class TicketEventsProducer {
  private readonly logger = new Logger(TicketEventsProducer.name);

  constructor(private readonly kafkaService: KafkaService) {}

  async ticketCreationSuccess(payload) {
    await this.kafkaService.emit('ticket.create.success', {
      ...payload,
      event: 'Ticket creation',
      timestamp: new Date().toISOString(),
    });
  }

  async ticketCreationFailed(payload) {
    await this.kafkaService.emit('ticket.create.failed', {
      // ...payload,
      // event: 'Ticket creation',
      // timestamp: new Date().toISOString(),
    });
  }
}
