import { Injectable, Logger } from "@nestjs/common";
import { KafkaService } from "../kafka.service";

@Injectable()
export abstract class BaseProducer {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(protected readonly kafkaService: KafkaService) {}

  protected async publishEvent(topic: string, payload: any): Promise<void> {
    try {
      await this.kafkaService.emit(topic, {
        ...payload,
        timestamp: new Date().toISOString(),
      });
      this.logger.log(`Event published to ${topic}`);
    } catch (error) {
      this.logger.error(`Failed to publish event to ${topic}:`, error.stack);
      throw error;
    }
  }
}
