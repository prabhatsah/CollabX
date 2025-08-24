import {
  type CreateTicketRequest,
  SUPPORT_TICKET_SERVICE_NAME,
} from '@app/common/proto/support-ticket';
import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'CreateTicket')
  createTicket(request: CreateTicketRequest) {
    const res = this.ticketService.createTicket(request);
    return res;
  }
}
