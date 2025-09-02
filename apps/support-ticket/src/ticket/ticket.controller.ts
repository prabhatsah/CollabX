import {
  type CreateTicketRequest,
  type GetTicketRequest,
  type ListTicketsRequest,
  SUPPORT_TICKET_SERVICE_NAME,
} from '@app/common/proto/support-ticket';
import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CurrentUser } from 'apps/api-gateway/src/common/decorators/current-user.decorator';
import { type SessionUser } from '@app/common/interfaces';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'CreateTicket')
  createTicket(request: CreateTicketRequest) {
    const res = this.ticketService.createTicket(request);
    return res;
  }

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'ListTickets')
  async listTickets(request: ListTicketsRequest) {
    console.log('request: ', request);

    const res = await this.ticketService.listTickets(request);
    console.log('res1: ', res);
    return res;
  }

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'GetTicket')
  getTicket(request: GetTicketRequest) {
    console.log('request: ', request);

    const res = this.ticketService.getTicket(request);
    return res;
  }
}
