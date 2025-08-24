import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTicketRequest } from '@app/common/proto/support-ticket';

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createTicket(data: CreateTicketRequest) {
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

    return { ticket };
  }
}
