import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  AssignTicketRequest,
  CreateTicketRequest,
  ListTicketActivityRequest,
  ListTicketsRequest,
  LockTicketRequest,
  TransitionStatusRequest,
  UpdatePriorityRequest,
  UpdateTypeRequest,
} from '@app/common/proto/support-ticket';
import { TicketEventsProducer } from '../kafka/events/ticket-events.producer';
import {
  TicketPriority,
  TicketStatus,
} from 'apps/support-ticket/prisma/generated/client';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly ticketEventsProducer: TicketEventsProducer,
  ) {}

  async createTicket(
    data: CreateTicketRequest,
    // meta: { ip?: string; userAgent?: string },
  ) {
    const {
      orgId,
      orgName,
      title,
      description,
      priority,
      type,
      createdByUserId,
      userEmail,
      userName,
    } = data;

    const ticketNo = await this.generateTicketNumber(orgId, orgName);

    this.logger.log(
      `Ticket creation request with ticketNo: ${ticketNo}, userName: ${userName}`,
    );

    const ticket = await this.prismaService.ticket.create({
      data: {
        ticketNo,
        orgId,
        title,
        description,
        createdByUserId,
        status: 'OPEN',
        priority,
        type,
      },
    });

    // Store history
    await this.prismaService.ticketActivity.create({
      data: {
        ticketId: ticket.id,
        orgId: ticket.orgId,
        type: 'created',
        actorUserId: createdByUserId,
        meta: { createdBy: createdByUserId },
      },
    });

    //produce event
    await this.ticketEventsProducer.ticketCreationSuccess({
      ticketNo,
      userName,
      email: userEmail,
      organizationName: orgName,
      title: ticket.title,
      priority: ticket.priority,
      type: ticket.type,
      createdAt: ticket.createdAt,
      status: ticket.status,
      message: 'Ticket created',
    });

    return { ticket };
  }

  async listTicketActivity(request: ListTicketActivityRequest) {
    const { ticketId } = request;

    if (!ticketId) {
      this.logger.error(`Ticket id not available`);

      // produce event

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Ticket id not found',
      });
    }

    const ticketActivityItem = await this.prismaService.ticketActivity.findMany(
      {
        where: {
          ticketId,
        },
        orderBy: { createdAt: 'asc' },
      },
    );

    const activities = ticketActivityItem.map((a) => {
      const base = {
        id: a.id,
        actor: a.actorUserId,
        type: a.type,
        meta: { [a.type]: a.meta },
        timestamp: a.createdAt,
      };

      // switch (a.type) {
      //   case 'created':
      //     return {
      //       ...base,
      //       type: 'created',
      //       meta: { createdBy: a.meta?.createdBy || a.actorUserId },
      //     };
      //   case 'locked':
      //     return {
      //       ...base,
      //       type: 'created',
      //       meta: { locked: a.meta?.locked ?? true },
      //     };
      //   case 'assigned':
      //     return {
      //       ...base,
      //       type: 'created',
      //       meta: { assignee: a.meta?.assignee || '' },
      //     };
      //   case 'status_changed':
      //     return {
      //       ...base,
      //       type: 'created',
      //       meta: {
      //         from: a.meta?.from || '',
      //         to: a.meta?.to || '',
      //       },
      //     };
      //   case 'priority_changed':
      //     return {
      //       ...base,
      //       type: 'created',
      //       meta: {
      //         from: a.meta?.from || '',
      //         to: a.meta?.to || '',
      //       },
      //     };
      //   case 'comment_added':
      //     return {
      //       ...base,
      //       type: 'created',
      //       meta: { body: a.meta?.body || '' },
      //     };
      //   default:
      //     console.warn('Unknown activity type:', a.type);
      //     return base;
      // }
      return base;
    });

    return {
      activities,
    };
  }

  async listTickets(request: ListTicketsRequest) {
    const {
      orgId,
      status,
      priority,
      assigneeUserId,
      limit = 10,
      cursor,
      actor,
    } = request;

    const where: Record<string, string> = {
      orgId,
      ...(status && status.length > 0
        ? { status: { in: status as TicketStatus[] } }
        : {}),
      ...(priority && priority.length > 0
        ? { priority: { in: priority as TicketPriority[] } }
        : {}),
      ...(assigneeUserId ? { assigneeUserId } : {}),
    };

    // Apply user level restrictions if role is USER
    if (actor?.role === 'USER') {
      where.createdByUserId = actor.userId;
    }

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
        locked: t.locked,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      })),
      nextCursor,
    };
  }

  async assignTicket(request: AssignTicketRequest) {
    const ticket = await this.prismaService.ticket.findFirst({
      where: { id: request.ticketId, orgId: request.orgId },
    });

    if (!ticket) {
      this.logger.error(`Assignment to ticket failed. Ticket not found`);

      // produce event

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Ticket not found',
      });
    }

    if (ticket.locked) {
      this.logger.error(
        `Assignment to ticket failed. Ticket locked by someone`,
      );

      // produce event

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'Ticket locked by someone.',
      });
    }

    // Update assignment
    const res = await this.prismaService.ticket.update({
      where: { id: request.ticketId },
      data: { assigneeUserId: request.assigneeUserId, updatedAt: new Date() },
    });

    // Store history
    await this.prismaService.ticketActivity.create({
      data: {
        ticketId: ticket.id,
        orgId: ticket.orgId,
        type: 'assigned',
        actorUserId: request.actorUserId,
        meta: { assignee: request.assigneeUserId },
      },
    });

    // produce event

    return { ticket: res };
  }

  async lockTicket(request: LockTicketRequest) {
    const ticket = await this.prismaService.ticket.findFirst({
      where: { id: request.ticketId, orgId: request.orgId },
    });

    if (!ticket) {
      this.logger.error(`Lock updation failed. Ticket not found`);

      // produce event

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Ticket not found',
      });
    }

    // Check ticket is assigned to actor
    if (ticket.assigneeUserId !== request.actorUserId) {
      this.logger.error(
        `Lock updation failed. You are not assigned to this ticket`,
      );

      // produce event

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'You are not assigned to this ticket',
      });
    }

    // Store old status
    // const oldLock = ticket.locked;

    // Transition status
    const res = await this.prismaService.ticket.update({
      where: { id: request.ticketId },
      data: { locked: request.lock, updatedAt: new Date() },
    });

    // Store history
    await this.prismaService.ticketActivity.create({
      data: {
        ticketId: ticket.id,
        orgId: ticket.orgId,
        type: 'locked',
        actorUserId: request.actorUserId,
        meta: { locked: request.lock },
      },
    });

    // produce event

    return { ticket: res };
  }

  async transitionStatus(request: TransitionStatusRequest) {
    const ticket = await this.prismaService.ticket.findFirst({
      where: { id: request.ticketId, orgId: request.orgId },
    });

    if (!ticket) {
      this.logger.error(`Status transition failed. Ticket not found`);

      // produce event

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Ticket not found',
      });
    }

    // Check ticket is assigned to actor
    if (ticket.assigneeUserId !== request.actorUserId) {
      this.logger.error(
        `Status transition failed. You are not assigned to this ticket!`,
      );

      // produce event

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'You are not assigned to this ticket!',
      });
    }

    // Check ticket is locked or not
    if (!ticket.locked) {
      this.logger.error(`Lock the ticket before proceeding!`);

      // produce event

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'Lock the ticket before proceeding!',
      });
    }

    // Check ticket is locked by another user
    // if (ticket.locked && ticket.assigneeUserId !== request.actorUserId) {
    //   this.logger.error(
    //     `Status transition failed. Ticket locked by another user`,
    //   );

    //   // produce event

    //   throw new RpcException({
    //     code: status.PERMISSION_DENIED,
    //     message: 'Ticket locked by another user',
    //   });
    // }

    // Store old status
    const oldStatus = ticket.status;

    // Transition status
    const res = await this.prismaService.ticket.update({
      where: { id: request.ticketId },
      data: { status: request.newStatus, updatedAt: new Date() },
    });

    // Store history
    await this.prismaService.ticketActivity.create({
      data: {
        ticketId: ticket.id,
        orgId: ticket.orgId,
        type: 'statusChanged',
        actorUserId: request.actorUserId,
        meta: { from: oldStatus, to: request.newStatus },
      },
    });

    // produce event

    return { ticket: res };
  }

  async updatePriority(request: UpdatePriorityRequest) {
    const ticket = await this.prismaService.ticket.findFirst({
      where: { id: request.ticketId, orgId: request.orgId },
    });

    if (!ticket) {
      this.logger.error(`Priority updation failed. Ticket not found`);

      // produce event

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Ticket not found',
      });
    }

    // if (!ticket.locked && ticket.assigneeUserId !== request.actorUserId) {
    //   this.logger.error(
    //     `Priority updation failed. Ticket locked by another user`,
    //   );

    //   // produce event

    //   throw new RpcException({
    //     code: status.PERMISSION_DENIED,
    //     message: 'Ticket locked by another user',
    //   });
    // }

    // Check ticket is assigned to actor
    if (ticket.assigneeUserId !== request.actorUserId) {
      this.logger.error(
        `Priority updation failed. You are not assigned to this ticket`,
      );

      // produce event

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'You are not assigned to this ticket',
      });
    }

    // Check ticket is locked or not
    if (!ticket.locked) {
      this.logger.error(`Lock the ticket before proceeding!`);

      // produce event

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'Lock the ticket before proceeding!',
      });
    }

    // Store old status
    const oldPriority = ticket.priority;

    // Transition status
    const res = await this.prismaService.ticket.update({
      where: { id: request.ticketId },
      data: { priority: request.newPriority, updatedAt: new Date() },
    });

    // Store history
    await this.prismaService.ticketActivity.create({
      data: {
        ticketId: ticket.id,
        orgId: ticket.orgId,
        type: 'priorityChanged',
        actorUserId: request.actorUserId,
        meta: { from: oldPriority, to: request.newPriority },
      },
    });

    // produce event

    return { ticket: res };
  }

  async updateType(request: UpdateTypeRequest) {
    const ticket = await this.prismaService.ticket.findFirst({
      where: { id: request.ticketId, orgId: request.orgId },
    });

    if (!ticket) {
      this.logger.error(`Type updation failed. Ticket not found`);

      // produce event

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Ticket not found',
      });
    }

    // if (!ticket.locked && ticket.assigneeUserId !== request.actorUserId) {
    //   this.logger.error(`Type updation failed. Ticket locked by another user`);

    //   // produce event

    //   throw new RpcException({
    //     code: status.PERMISSION_DENIED,
    //     message: 'Ticket locked by another user',
    //   });
    // }

    // Check ticket is assigned to actor
    if (ticket.assigneeUserId !== request.actorUserId) {
      this.logger.error(
        `Type updation failed. Ticket assigned to another user`,
      );

      // produce event

      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'Ticket assigned to another user',
      });
    }

    // Store old status
    const oldType = ticket.type;

    // Transition status
    const res = await this.prismaService.ticket.update({
      where: { id: request.ticketId },
      data: { type: request.newType, updatedAt: new Date() },
    });

    // Store history
    await this.prismaService.ticketActivity.create({
      data: {
        ticketId: ticket.id,
        orgId: ticket.orgId,
        type: 'typeChanged',
        actorUserId: request.actorUserId,
        meta: { from: oldType, to: request.newType },
      },
    });

    // produce event

    return { ticket: res };
  }

  //=======================================================================
  //                   Helper functions
  //=======================================================================
  async generateTicketNumber(orgId: string, orgName: string): Promise<string> {
    const now = new Date();
    const yy = now.getFullYear().toString().slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yearMonth = `${yy}${mm}`;

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
