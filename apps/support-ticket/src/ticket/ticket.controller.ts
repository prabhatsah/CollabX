import {
  type AssignTicketRequest,
  type CreateTicketRequest,
  type ListTicketActivityRequest,
  type ListTicketsRequest,
  type LockTicketRequest,
  SUPPORT_TICKET_SERVICE_NAME,
  type TransitionStatusRequest,
  type UpdatePriorityRequest,
  type UpdateTypeRequest,
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

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'ListTicketActivity')
  async listTicketActivity(request: ListTicketActivityRequest) {
    const res = await this.ticketService.listTicketActivity(request);
    return res;
  }

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'ListTickets')
  async listTickets(request: ListTicketsRequest) {
    const res = await this.ticketService.listTickets(request);
    return res;
  }

  // @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'GetTicket')
  // getTicket(request: GetTicketRequest) {
  //   console.log('request: ', request);

  //   const res = this.ticketService.getTicket(request);
  //   return res;
  // }

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'AssignTicket')
  assignTicket(request: AssignTicketRequest) {
    // console.log('request: ', request);
    const res = this.ticketService.assignTicket(request);
    // console.log('res: ', res);
    return res;
  }

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'LockTicket')
  lockTicket(request: LockTicketRequest) {
    // console.log('request: ', request);
    const res = this.ticketService.lockTicket(request);
    // console.log('res: ', res);
    return res;
  }

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'TransitionStatus')
  transitionStatus(request: TransitionStatusRequest) {
    // console.log('request: ', request);
    const res = this.ticketService.transitionStatus(request);
    return res;
  }

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'UpdatePriority')
  updatePriority(request: UpdatePriorityRequest) {
    const res = this.ticketService.updatePriority(request);
    return res;
  }

  @GrpcMethod(SUPPORT_TICKET_SERVICE_NAME, 'UpdateType')
  updateType(request: UpdateTypeRequest) {
    // console.log('request: ', request);
    const res = this.ticketService.updateType(request);
    // console.log('res: ', res);
    return res;
  }
}
