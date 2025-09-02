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
    const { orgId, orgName, title, description, priority, createdByUserId } =
      data;

    const ticketNo = await this.generateTicketNumber(orgId, orgName);

    this.logger.log(`Ticket creation request with ticketNo: ${ticketNo}`);

    const ticket = await this.prismaService.ticket.create({
      data: {
        ticketNo,
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
      ticketNo,
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
        ticketNo: t.ticketNo,
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
  

  // Helper functions
  async generateTicketNumber(orgId: string, orgName: string): Promise<string> {
    const now = new Date();
    const yy = now.getFullYear().toString().slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yearMonth = `${yy}${mm}`;

    console.log('Org', orgId, orgName);

    const prefix = orgName.substring(0, 3).toUpperCase();

    const counterRecord = await this.prismaService.ticketCounter.upsert({
      where: { orgId_yearMonth: { orgId, yearMonth } },
      update: { counter: { increment: 1 } },
      create: { orgId, yearMonth, counter: 1 },
    });

    const counter = String(counterRecord.counter).padStart(3, '0');

    return `${prefix}-${yearMonth}${counter}`;
  }
}
