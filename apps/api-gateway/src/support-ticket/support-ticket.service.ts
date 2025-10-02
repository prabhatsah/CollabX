import {
  AssignTicketRequest,
  CreateTicketRequest,
  LockTicketRequest,
  SUPPORT_TICKET_SERVICE_NAME,
  SupportTicketClient,
  TransitionStatusRequest,
  UpdatePriorityRequest,
  UpdateTypeRequest,
} from '@app/common/proto/support-ticket';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
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

  async createTicket(request: CreateTicketRequest) {
    const res = await lastValueFrom(
      this.supportTicketClient.createTicket(request),
    );
    this.logger.debug(
      `Ticket created successfully with title: ${res.ticket?.title}`,
    );
    return res.ticket;
  }

  async listTicketActivity(request: string) {
    const res = await lastValueFrom(
      this.supportTicketClient.listTicketActivity({ ticketId: request }),
    );

    return res;
  }

  async listTickets(request: ListTicketsDto) {
    const res = await lastValueFrom(
      this.supportTicketClient.listTickets(request),
    );
    this.logger.debug(`Ticket fetched successfully: ${JSON.stringify(res)}`);
    return res;
  }

  async assignTicket(request: AssignTicketRequest) {
    const res = await lastValueFrom(
      this.supportTicketClient.assignTicket(request),
    );
    this.logger.debug(`Ticket assigned successfully: ${JSON.stringify(res)}`);
    return res;
  }

  async lockTicket(request: LockTicketRequest) {
    const res = await lastValueFrom(
      this.supportTicketClient.lockTicket(request),
    );
    this.logger.debug(`Lock updated successfully: ${JSON.stringify(res)}`);
    return res;
  }

  async transitionStatus(request: TransitionStatusRequest) {
    const res = await lastValueFrom(
      this.supportTicketClient.transitionStatus(request),
    );
    this.logger.debug(`Status updated successfully: ${JSON.stringify(res)}`);
    return res;
  }

  async updatePriority(request: UpdatePriorityRequest) {
    const res = await lastValueFrom(
      this.supportTicketClient.updatePriority(request),
    );
    this.logger.debug(`Priority updated successfully: ${JSON.stringify(res)}`);
    return res;
  }

  async updateType(request: UpdateTypeRequest) {
    const res = await lastValueFrom(
      this.supportTicketClient.updateType(request),
    );
    this.logger.debug(`Type updated successfully: ${JSON.stringify(res)}`);
    return res;
  }
}
