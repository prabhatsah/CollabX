import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import path from 'path';
import { Ticket } from '@app/common/proto/support-ticket';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASSKEY'),
      },
    });
  }

  private compileTemplate(templateName: string, context: any) {
    //const filePath = `./src/templates/${templateName}.hbs`;
    const filePath = path.join(
      process.cwd(),
      'apps',
      'mail-service',
      'src',
      'templates',
      `${templateName}.hbs`,
    );
    const source = fs.readFileSync(filePath, 'utf-8');
    const compiled = handlebars.compile(source);
    return compiled(context);
  }

  async sendSignupMail(data: { email: string; name: string }) {
    const html = this.compileTemplate('signup', { name: data.name });
    await this.transporter.sendMail({
      to: data.email,
      subject: 'Welcome to CollabX',
      html,
    });
  }

  async sendTicketCreatedMail(data: Ticket) {
    console.log('data in mail service:', data);
    const html = this.compileTemplate('ticket-created', {
      user: data.userId,
      ticketNo: data.ticketNo,
      title: data.title,
      priority: data.priority,
      type: data.type,
      status: data.status,
      createdAt: data.createdAt,
      ticketUrl: `https://www.google.com`,
      year: new Date().getFullYear(),
    });

    await this.transporter.sendMail({
      to: data.email,
      subject: `Ticket Created: ${data.ticketNo}`,
      html,
    });
    this.logger.log(`Mail send to ${data.email}`);
  }

  async sendInvitationMail(data: {
    email: string;
    orgName: string;
    inviteLink: string;
  }) {
    const html = this.compileTemplate('invitationCreation', data);
    await this.transporter.sendMail({
      to: data.email,
      subject: `Invitation to join ${data.orgName}`,
      html,
    });
  }

  async sendInvitationAcceptanceMail(data: {
    email: string;
    orgName: string;
    inviteLink: string;
  }) {
    const html = this.compileTemplate('invitationAcceptance', data);
    await this.transporter.sendMail({
      to: data.email,
      subject: `Confirmation on joining ${data.orgName}`,
      html,
    });
  }
}
