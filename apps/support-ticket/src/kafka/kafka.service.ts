import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);

  private readonly kafka: Kafka;
  private readonly producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'suport-ticket-service',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
    this.logger.debug(`Support ticket producer connected`);
  }

  async emit(topic: string, message: any) {
    const key = randomUUID();

    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(message) }],
    });

    this.logger.log(
      `Event emitted for topic: ${topic} from support ticket service`,
    );
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
