import { Injectable, Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_TOPICS } from "@app/common";

@Injectable()
export class UserEventProducer {
  constructor(
    @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka
  ) {}

  async publishUserUpdated(userId: string, updates: any) {
    try {
      await this.kafkaClient.emit(KAFKA_TOPICS.USER_UPDATED, {
        userId,
        updates,
        timestamp: new Date().toISOString(),
        service: "user-organization-service",
      });
    } catch (error) {
      console.error("Error publishing user updated event:", error);
    }
  }

  async publishUserDeactivated(userId: string, reason?: string) {
    try {
      await this.kafkaClient.emit(KAFKA_TOPICS.USER_DEACTIVATED, {
        userId,
        reason,
        timestamp: new Date().toISOString(),
        service: "user-organization-service",
      });
    } catch (error) {
      console.error("Error publishing user deactivated event:", error);
    }
  }
}
