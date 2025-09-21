import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);

  private readonly kafka: Kafka;
  private readonly consumer: Consumer;

  // store topic handlers
  private readonly topicHandlers = new Map<
    string,
    (event: any) => Promise<void>
  >();

  constructor(private readonly configService: ConfigService) {
    // this.kafka = new Kafka({
    //   clientId: 'audit-service',
    //   brokers: [process.env.KAFKA_BROKER || 'localhost:29092'],
    // });
    this.kafka = new Kafka({
      clientId: this.configService.get<string>('AUDIT_KAFKA_CLIENT_ID'),
      brokers: [this.configService.get<string>('KAFKA_BROKER') || ''],
    });

    this.consumer = this.kafka.consumer({ groupId: 'audit-service-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    this.logger.log(`Audit service consumer connected`);
  }

  async subscribe(topic: string, callback: (message: any) => Promise<void>) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    this.topicHandlers.set(topic, callback);
    this.logger.log(`Subscribed to topic: ${topic}`);
  }

  async start() {
    await this.consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        const value = message.value?.toString();
        const handler = this.topicHandlers.get(topic);

        if (handler && value) {
          this.logger.log(`Event consumed for topic: ${topic}`);

          await handler(JSON.parse(value));
        }
      },
    });

    this.logger.log('Kafka consumer started');
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    this.logger.log(`Audit service consumer disconnected`);
  }
}
