import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    try {
      await this.kafkaClient.connect();
      this.logger.log("Kafka client connected successfully");
    } catch (error) {
      this.logger.error("Failed to connect to Kafka", error.stack);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.kafkaClient.close();
      this.logger.log("Kafka client disconnected successfully");
    } catch (error) {
      this.logger.error("Error disconnecting from Kafka", error.stack);
    }
  }

  async emit(topic: string, payload: any): Promise<void> {
    try {
      await this.kafkaClient.emit(topic, payload);
      this.logger.log(`Message sent to topic: ${topic}`);
    } catch (error) {
      this.logger.error(
        `Failed to send message to topic ${topic}:`,
        error.stack
      );
      throw error;
    }
  }

  subscribeToTopics(topics: string[]): void {
    topics.forEach((topic) => {
      this.kafkaClient.subscribeToResponseOf(topic);
    });
  }
}
