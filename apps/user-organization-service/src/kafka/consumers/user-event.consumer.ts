import { Injectable } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { UsersService } from "../../users/users.service";
import { KAFKA_TOPICS, CreateUserDto } from "@app/common";

@Injectable()
export class UserEventConsumer {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(KAFKA_TOPICS.USER_REGISTERED)
  async handleUserRegistered(@Payload() data: CreateUserDto) {
    try {
      console.log("Processing user registered event:", data);

      // Check if user already exists (idempotent)
      const existingUser = await this.usersService.findUserByEmail(data.email);

      if (!existingUser) {
        await this.usersService.createUser(data);
        console.log("User created from registration event:", data.email);
      } else {
        console.log("User already exists, skipping creation:", data.email);
      }
    } catch (error) {
      console.error("Error processing user registered event:", error);
      // In production, you might want to send to dead letter queue
    }
  }

  @EventPattern(KAFKA_TOPICS.USER_UPDATED)
  async handleUserUpdated(@Payload() data: { userId: string; updates: any }) {
    try {
      console.log("Processing user updated event:", data);

      await this.usersService.updateUser(data.userId, data.updates);
      console.log("User updated from event:", data.userId);
    } catch (error) {
      console.error("Error processing user updated event:", error);
    }
  }
}
