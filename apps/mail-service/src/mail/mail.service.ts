import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import path from 'path';
import mjml2html from 'mjml';
import {
  InvitationAcceptPayload,
  InvitationPayload,
} from '@app/common/interfaces';
import {
  formatDate,
  PRIORITY_MAP,
  ROLES_MAP,
  STATUS_MAP,
  TicketCreateEventPayload,
  Type_MAP,
} from '@app/common';

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

  private compileTemplate(templateName: string, data: Record<string, string>) {
    console.log('data for temlate:', data);

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
    return compiled(data);
  }

  // private compileMJMLTemplate(
  //   templateName: string,
  //   values: Record<string, string>,
  // ) {
  //   const filePath = path.join(
  //     process.cwd(),
  //     'apps',
  //     'mail-service',
  //     'src',
  //     'templates',
  //     `${templateName}.mjml`,
  //   );
  //   const source = fs.readFileSync(filePath, 'utf-8');

  //   // Add more info
  //   const templateValues: Record<string, string> = {
  //     ...values,
  //     company_name: 'CollabX',
  //     support_email: 'pr.prabhat.sah@gmail.com',
  //     company_logo: 'cid:collabx-logo-white-transparent.png',
  //     current_year: String(new Date().getFullYear()),
  //   };

  //   // Replace {{ key }} allowing for optional whitespace inside the braces
  //   const filledTemplate = Object.entries(templateValues).reduce(
  //     (tpl, [key, val]) => {
  //       const re = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
  //       return tpl.replace(re, val);
  //     },
  //     source,
  //   );

  //   // Convert MJML → HTML
  //   const html = mjml2html(filledTemplate).html;

  //   return html;
  // }

  async sendSignupMail(data: { email: string; name: string }) {
    const html = this.compileTemplate('signup', { name: data.name });
    await this.transporter.sendMail({
      to: data.email,
      subject: 'Welcome to CollabX',
      html,
    });
  }

  async sendTicketCreatedMail(payload: TicketCreateEventPayload) {
    console.log('payload in mail service:', payload);
    const html = this.compileTemplate('ticket-created', {
      userName: payload.userName,
      ticketNo: payload.ticketNo,
      title: payload.title,
      organizationName: payload.organizationName,
      priority: PRIORITY_MAP[payload.priority],
      type: Type_MAP[payload.type],
      status: STATUS_MAP[payload.status],
      createdAt: formatDate(payload.createdAt),
      ticketUrl: `http://localhost:5555/login`,
      year: `${new Date().getFullYear()}`,
    });

    await this.transporter.sendMail({
      to: payload.email,
      subject: `Ticket Created: ${payload.ticketNo}`,
      html,
    });
    this.logger.log(`Mail send to ${payload.email}`);
  }

  async sendInvitationMailDiscarded(payload: InvitationPayload) {
    console.log('-------- Invitation payload:', payload);

    const values: Record<string, string> = {
      organizationName: payload.organizationName,
      role: ROLES_MAP[payload.role],
      token: payload.token,
      invitedAt: payload.invitedAt,
      expiresAt: payload.expiresAt,
      url: 'http://localhost:5555/user-invitation',
    };

    const html = this.compileMJMLTemplate('invitation-creation', values);

    await this.transporter.sendMail({
      to: payload.email,
      subject: `Invitation to join ${payload.organizationName}`,
      html,
      attachments: [
        {
          filename: 'collabx-logo-white-transparent.png',
          path: path.join(
            process.cwd(),
            'apps',
            'mail-service',
            'src',
            'assets',
            'collabx-logo-white-transparent.png',
          ),
          cid: 'collabx-logo-white-transparent.png', // must match template
        },
      ],
    });
    this.logger.log(`Invitation mail send to ${payload.email}`);
  }
  async sendInvitationMail(payload: InvitationPayload) {
    console.log('-------- Invitation payload:', payload);

    const html = this.compileTemplate('invitation-create', {
      organizationName: payload.organizationName,
      role: ROLES_MAP[payload.role],
      token: payload.token,
      invitedAt: payload.invitedAt,
      expiresAt: payload.expiresAt,
      ticketUrl: `http://localhost:5555/login`,
      year: `${new Date().getFullYear()}`,
    });

    await this.transporter.sendMail({
      to: payload.email,
      subject: `Invitation to join ${payload.organizationName}`,
      html,
    });

    this.logger.log(`Invitation mail send to ${payload.email}`);
  }

  async sendInvitationAcceptMailDiscarded(payload: InvitationAcceptPayload) {
    console.log('-------- Invitation accept payload:', payload);

    const values: Record<string, string> = {
      organizationName: payload.organizationName,
      role: ROLES_MAP[payload.role],
      joinedAt: formatDate(payload.acceptedAt),
      url: 'http://localhost:5555/login',
    };

    const html = this.compileMJMLTemplate('invitation-accept', values);

    await this.transporter.sendMail({
      to: payload.email,
      subject: `Confirmation on joining ${payload.organizationName}`,
      html,
      attachments: [
        {
          filename: 'collabx-logo-white-transparent.png',
          path: path.join(
            process.cwd(),
            'apps',
            'mail-service',
            'src',
            'assets',
            'collabx-logo-white-transparent.png',
          ),
          cid: 'collabx-logo-white-transparent.png',
        },
      ],
    });

    this.logger.log(`Invitation accept mail send to ${payload.email}`);
  }
  async sendInvitationAcceptMail(payload: InvitationAcceptPayload) {
    console.log('-------- Invitation accept payload:', payload);

    const html = this.compileTemplate('invitation-accept', {
      userName: payload.userName,
      organizationName: payload.organizationName,
      role: ROLES_MAP[payload.role],
      joinedAt: formatDate(payload.acceptedAt),
      ticketUrl: `http://localhost:5555/login`,
      year: `${new Date().getFullYear()}`,
    });

    await this.transporter.sendMail({
      to: payload.email,
      subject: `Confirmation on joining ${payload.organizationName}`,
      html,
    });

    this.logger.log(`Invitation accept mail send to ${payload.email}`);
  }
}
