import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../kafka.service';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class MailConsumer implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly mailService: MailService,
  ) {}

  async onModuleInit() {
    await this.kafkaService.subscribe('signup', async (event) => {
      await this.mailService.sendSignupMail(event);
    });

    await this.kafkaService.subscribe(
      'ticket.create.success',
      async (event) => {
        await this.mailService.sendTicketCreatedMail(event);
      },
    );

    await this.kafkaService.subscribe('invite', async (event) => {
      await this.mailService.sendInviteMail(event);
    });

    // start consuming after subscriptions are registered
    await this.kafkaService.start();
  }
}
