import { Logger } from "@nestjs/common";

export abstract class BaseConsumer {
  protected readonly logger = new Logger(this.constructor.name);

  protected logEventReceived(topic: string, payload: any): void {
    this.logger.log(`Event received from ${topic}:`, JSON.stringify(payload));
  }

  protected logEventProcessed(topic: string, payload: any): void {
    this.logger.log(
      `Event processed from ${topic} for entity:`,
      payload.id || "unknown"
    );
  }

  protected logEventError(topic: string, error: any): void {
    this.logger.error(`Error processing event from ${topic}:`, error.stack);
  }
}
