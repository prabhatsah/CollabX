import {
  SUPPORT_TICKET_SERVICE_NAME,
  SupportTicketClient,
  TicketPriority,
} from '@app/common/proto/support-ticket';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportTicketService implements OnModuleInit {
  private readonly logger = new Logger(SupportTicketService.name);

  private supportTicketClient: SupportTicketClient;

  constructor(
    @Inject(SUPPORT_TICKET_SERVICE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.supportTicketClient = this.client.getService<SupportTicketClient>(
      SUPPORT_TICKET_SERVICE_NAME,
    );
  }

  async createTicket(request: CreateTicketDto) {
    console.log('Ticket creation request:', request);

    const res = await lastValueFrom(
      this.supportTicketClient.createTicket(request),
    );

    console.log('Rs', res);

    return res.ticket;
  }
}
