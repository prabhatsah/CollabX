import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context?: Record<string, any>;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      // Implementation would depend on your email provider (SendGrid, AWS SES, etc.)
      this.logger.log(
        `Sending email to: ${options.to}, Subject: ${options.subject}`
      );

      // For now, this is a placeholder implementation
      // replace this with actual email sending logic
      await this.mockSendEmail(options);

      this.logger.log(`Email sent successfully to: ${options.to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to: ${options.to}`, error.stack);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: "Welcome to Our Platform",
      template: "welcome",
      context: {
        name,
        loginUrl: this.configService.get("APP_URL"),
      },
    });
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<void> {
    const resetUrl = `${this.configService.get(
      "APP_URL"
    )}/reset-password?token=${resetToken}`;

    await this.sendEmail({
      to: email,
      subject: "Password Reset Request",
      template: "password-reset",
      context: {
        resetUrl,
        expirationTime: "1 hour",
      },
    });
  }

  async sendInvitationEmail(options: {
    email: string;
    organizationName: string;
    inviteToken: string;
    invitedBy: string;
  }): Promise<void> {
    const inviteUrl = `${this.configService.get(
      "APP_URL"
    )}/accept-invitation?token=${options.inviteToken}`;
    const organizationName = options.organizationName;
    await this.sendEmail({
      to: options.email,
      subject: `Invitation to join ${options.organizationName} by ${options.invitedBy}`,
      template: "organization-invite",
      context: {
        organizationName,
        inviteUrl,
        expirationTime: "7 days",
      },
    });
  }

  async sendEmailVerification(
    email: string,
    verificationToken: string
  ): Promise<void> {
    const verificationUrl = `${this.configService.get(
      "APP_URL"
    )}/verify-email?token=${verificationToken}`;

    await this.sendEmail({
      to: email,
      subject: "Verify Your Email Address",
      template: "email-verification",
      context: {
        verificationUrl,
        expirationTime: "24 hours",
      },
    });
  }

  private async mockSendEmail(options: EmailOptions): Promise<void> {
    // Mock implementation - replace with actual email provider
    return new Promise((resolve) => {
      setTimeout(() => {
        this.logger.debug(`Mock email sent: ${JSON.stringify(options)}`);
        resolve();
      }, 100);
    });
  }
}
