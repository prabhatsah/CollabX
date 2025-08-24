import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AuditPayload, GetLogsRequest } from '@app/common/proto/audit';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createLog(eventType: string, payload: AuditPayload) {
    const res = await this.prismaService.auditLog.create({
      data: {
        eventType: eventType,
        payload: payload,
      },
    });

    console.log(`Log create response:`, res);

    this.logger.log(`Event log saved in database for topic: ${eventType}`);
  }

  async getLogs(request: GetLogsRequest) {
    const { limit } = request;

    const auditLogs = await this.prismaService.auditLog.findMany({
      take: limit > 0 ? limit : 100, // fallback to 10 if no limit passed
      orderBy: { createdAt: 'desc' },
    });

    return { auditLogs: auditLogs };
  }

  checkHealth() {
    return {
      serviceUp: true,
      databaseConnected: true,
      dependenciesHealthy: true,
      statusMessage: 'Audit service is up and running ...',
    };
  }
}
