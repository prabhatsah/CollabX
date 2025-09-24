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

  private readonly topicHandlers = new Map<
    string,
    (events: any) => Promise<void>
  >();

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: this.configService.get<string>('MAIL_KAFKA_CLIENT_ID'),
      brokers: [this.configService.get('KAFKA_BROKER') || ''],
    });
    this.consumer = this.kafka.consumer({ groupId: 'mail-service-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    this.logger.log('Mail service consumer connected');
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
        const handle = this.topicHandlers.get(topic);

        if (handle && value) {
          this.logger.log(`Event consumed for topic: ${topic}`);
          await handle(JSON.parse(value));
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    this.logger.log('Email servcie consumer disconnected');
  }
}
