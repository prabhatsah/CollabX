import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  CreateTicketRequest,
  GetTicketRequest,
  ListTicketsRequest,
} from '@app/common/proto/support-ticket';
import { TicketEventsProducer } from '../kafka/events/ticket-events.producer';
import { log } from '@grpc/grpc-js/build/src/logging';
import {
  TicketPriority,
  TicketStatus,
} from 'apps/support-ticket/prisma/generated/client';

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly ticketEventsProducer: TicketEventsProducer,
  ) {}

  async createTicket(
    data: CreateTicketRequest,
    meta: { ip?: string; userAgent?: string },
  ) {
    const { orgId, title, description, priority, createdByUserId } = data;

    this.logger.log(`Ticket creation request with title: ${priority}`);

    const ticket = await this.prismaService.ticket.create({
      data: {
        orgId,
        title,
        description,
        createdByUserId,
        status: 'OPEN',
        priority,
      },
    });

    console.log('ticket:', ticket);

    await this.ticketEventsProducer.ticketCreationSuccess({
      userId: createdByUserId,
      orgId: orgId,
      title: ticket.title,
      message: 'Ticket created',
      success: true,
      ...meta,
    });

    return { ticket };
  }

  async listTickets(request: ListTicketsRequest) {
    const {
      orgId,
      status,
      priority,
      assigneeUserId,
      createdByUserId,
      limit = 10,
      cursor,
    } = request;

    const where: any = {
      orgId,
      createdByUserId,
      ...(status && status.length > 0
        ? { status: { in: status as TicketStatus[] } }
        : {}),
      ...(priority && priority.length > 0
        ? { priority: { in: priority as TicketPriority[] } }
        : {}),
      ...(assigneeUserId ? { assigneeUserId } : {}),
    };

    const tickets = await this.prismaService.ticket.findMany({
      where,
      take: limit + 1,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      orderBy: { createdAt: 'desc' },
    });

    let nextCursor: string | null = null;
    if (tickets.length > limit) {
      const nextItem = tickets.pop();
      nextCursor = nextItem?.id || null;
    }

    return {
      tickets: tickets.map((t) => ({
        id: t.id,
        orgId: t.orgId,
        title: t.title,
        description: t.description,
        createdByUserId: t.createdByUserId,
        assigneeUserId: t.assigneeUserId,
        status: t.status,
        priority: t.priority,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      })),
      nextCursor,
    };
  }

  async getTicket(request: GetTicketRequest) {
    return 'Ticket';
  }
}
