import { Injectable } from "@nestjs/common";
import { KAFKA_TOPICS } from "@app/common";
import { BaseProducer } from "libs/kafka/src";

@Injectable()
export class AuthEventsProducer extends BaseProducer {
  async publishUserSignup(payload: {
    userId: string;
    email: string;
    fullName: string;
    organizationName?: string;
  }) {
    await this.publishEvent(KAFKA_TOPICS.USER_SIGNUP, payload);
  }

  async publishUserLogin(payload: {
    userId: string;
    email: string;
    loginTime: Date;
  }) {
    await this.publishEvent(KAFKA_TOPICS.USER_LOGIN, payload);
  }

  async publishInvitationSent(payload: {
    email: string;
    organizationId: string;
    invitedBy: string;
    token: string;
  }) {
    await this.publishEvent(KAFKA_TOPICS.USER_INVITE_SENT, payload);
  }

  async publishMembershipCreated(payload: {
    userId: string;
    organizationId: string;
    invitedBy?: string;
    role: string;
  }) {
    await this.publishEvent(KAFKA_TOPICS.MEMBERSHIP_CREATED, payload);
  }
}
