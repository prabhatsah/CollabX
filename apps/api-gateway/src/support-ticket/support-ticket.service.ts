import {
  SUPPORT_TICKET_SERVICE_NAME,
  SupportTicketClient,
} from '@app/common/proto/support-ticket';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { lastValueFrom } from 'rxjs';
import { ListTicketsDto } from './dto/list-tickets.dto';

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
    const res = await lastValueFrom(
      this.supportTicketClient.createTicket(request),
    );
    this.logger.debug(
      `Ticket created successfully with title: ${res.ticket?.title}`,
    );
    return res.ticket;
  }

  async listTickets(request: ListTicketsDto) {
    const res = await lastValueFrom(
      this.supportTicketClient.listTickets(request),
    );
    this.logger.debug(`Ticket fetched successfully: ${JSON.stringify(res)}`);
    return res;
  }
}
