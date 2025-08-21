import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private readonly kafka: Kafka;
  private readonly producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'auth-service',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
    this.logger.log(`Auth service producer connected`);
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async emit(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [
        { key: message.userId || null, value: JSON.stringify(message) },
      ],
    });
    this.logger.log(
      `Event emitted for topic: ${topic} with email: ${message.email}`,
    );
  }
}
