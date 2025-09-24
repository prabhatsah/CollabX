import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASSWORD'),
      },
    });
  }

  private compileTemplate(templateName: string, context: any) {
    const filePath = `./src/templates/${templateName}.hbs`;
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

  async sendTicketCreatedMail(data: {
    email: string;
    ticketNo: string;
    title: string;
  }) {
    console.log('data in mail service:', data);
    const html = this.compileTemplate('ticket-created', {
      ticketNo: data.ticketNo,
      title: data.title,
    });
    await this.transporter.sendMail({
      to: data.email,
      subject: `Ticket ${data.ticketNo} Created`,
      html,
    });
  }

  async sendInviteMail(data: {
    email: string;
    orgName: string;
    inviteLink: string;
  }) {
    const html = this.compileTemplate('invite', data);
    await this.transporter.sendMail({
      to: data.email,
      subject: `Invitation to join ${data.orgName}`,
      html,
    });
  }
}
