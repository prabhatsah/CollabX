// apps/auth-service/src/kafka/consumers/auth-events.consumer.ts
import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KAFKA_TOPICS } from "@app/common";

@Controller()
export class AuthEventsConsumer {
  private readonly logger = new Logger(AuthEventsConsumer.name);

  @MessagePattern(KAFKA_TOPICS.USER_SIGNUP)
  async handleUserSignup(@Payload() data: any) {
    this.logger.log(`📥 USER_SIGNUP event received: ${JSON.stringify(data)}`);
    // TODO: Add logic for signup event
  }

  @MessagePattern(KAFKA_TOPICS.USER_LOGIN)
  async handleUserLogin(@Payload() data: any) {
    this.logger.log(`📥 USER_LOGIN event received: ${JSON.stringify(data)}`);
    // TODO: Add logic for login event
  }

  @MessagePattern(KAFKA_TOPICS.USER_INVITE_SENT)
  async handleUserInviteSent(@Payload() data: any) {
    this.logger.log(
      `📥 USER_INVITE_SENT event received: ${JSON.stringify(data)}`
    );
    // TODO: Add logic for invite event
  }

  @MessagePattern(KAFKA_TOPICS.MEMBERSHIP_CREATED)
  async handleMembershipCreated(@Payload() data: any) {
    this.logger.log(
      `📥 MEMBERSHIP_CREATED event received: ${JSON.stringify(data)}`
    );
    // TODO: Add logic for membership created event
  }
}
