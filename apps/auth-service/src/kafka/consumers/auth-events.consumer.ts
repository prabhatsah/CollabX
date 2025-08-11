// apps/auth-service/src/kafka/consumers/auth-events.consumer.ts
import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KAFKA_TOPICS } from "@app/common";
import { AuthService } from "../../auth/auth.service";

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

  @MessagePattern(KAFKA_TOPICS.INVITATION_SENT)
  async handleUserInviteSent(@Payload() data: any) {
    this.logger.log(
      `📥 USER_INVITE_SENT event received: ${JSON.stringify(data)}`
    );
    // TODO: Add logic for invite event
  }

  @MessagePattern(KAFKA_TOPICS.MEMBER_ADDED)
  async handleMembershipCreated(@Payload() data: any) {
    this.logger.log(`📥 MEMBER_ADDED event received: ${JSON.stringify(data)}`);
    // TODO: Add logic for membership created event
  }

  // @MessagePattern("auth.validate_token")
  // async validateTokenPattern(data: { token: string }) {
  //   try {
  //     const payload = await this.authService.validateToken(data.token);
  //     return {
  //       valid: true,
  //       payload,
  //       authUserId: payload.sub,
  //     };
  //   } catch (error) {
  //     return {
  //       valid: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // @MessagePattern("auth.create_credentials")
  // async createCredentialsPattern(data: { email: string; password: string }) {
  //   try {
  //     const result = await this.authService.createCredentials(
  //       data.email,
  //       data.password
  //     );
  //     return {
  //       success: true,
  //       authUserId: result.authUserId,
  //       email: result.email,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // @MessagePattern("auth.verify_credentials")
  // async verifyCredentialsPattern(data: { email: string; password: string }) {
  //   try {
  //     const result = await this.authService.validateCredentials(
  //       data.email,
  //       data.password
  //     );
  //     return {
  //       valid: true,
  //       authUserId: result.authUserId,
  //       email: result.email,
  //     };
  //   } catch (error) {
  //     return {
  //       valid: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // @MessagePattern("auth.generate_tokens")
  // async generateTokensPattern(data: { authUserId: string; email: string }) {
  //   try {
  //     const tokens = await this.authService.generateTokens(
  //       data.authUserId,
  //       data.email
  //     );
  //     return {
  //       success: true,
  //       ...tokens,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // @MessagePattern("auth.invalidate_user_tokens")
  // async invalidateUserTokensPattern(data: { authUserId: string }) {
  //   try {
  //     await this.authService.invalidateAllUserTokens(data.authUserId);
  //     return { success: true };
  //   } catch (error) {
  //     return { success: false, error: error.message };
  //   }
  // }
}
