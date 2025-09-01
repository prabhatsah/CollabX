import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../../kafka.service';
import { AuditService } from 'apps/audit-service/src/audit/audit.service';

@Injectable()
export class AuditEventsConsumer implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly auditService: AuditService,
  ) {}

  async onModuleInit() {
    // Listen for auth login success
    await this.kafkaService.subscribe('auth.login.success', async (event) => {
      await this.auditService.createLog('auth.login.success', event);
    });

    //Listen for auth login failed
    await this.kafkaService.subscribe('auth.login.failed', async (event) => {
      await this.auditService.createLog('auth.login.failed', event);
    });

    await this.kafkaService.subscribe(
      'ticket.create.success',
      async (event) => {
        await this.auditService.createLog('ticket.create.success', event);
      },
    );

    //Listen for auth login failed
    await this.kafkaService.subscribe('ticket.create.failed', async (event) => {
      await this.auditService.createLog('ticket.create.failed', event);
    });

    // start consuming after subscriptions are registered
    await this.kafkaService.start();
  }
}
