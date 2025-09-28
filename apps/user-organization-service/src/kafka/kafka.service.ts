import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);

  private readonly kafka: Kafka;
  private readonly producer: Producer;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: this.configService.get<string>('USER_ORG_KAFKA_CLIENT_ID'),
      brokers: [this.configService.get<string>('KAFKA_BROKER') || ''],
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
    this.logger.log(`User-org kafka producer connected`);
  }

  async emit(topic: string, message: any) {
    const key = randomUUID();

    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(message) }],
    });

    this.logger.log(`Event emitted for topic: ${topic} from user-org service`);
  }

  async onModuleDestroy() {
    this.logger.log(`User-org kafka producer disconnected`);
    await this.producer.disconnect();
  }
}
