import { Module, DynamicModule } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KafkaService } from "./kafka.service";

export interface KafkaModuleOptions {
  clientId: string;
  groupId: string;
}

@Module({})
export class KafkaModule {
  static register(options: KafkaModuleOptions): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: "KAFKA_SERVICE",
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: options.clientId,
                  brokers: configService
                    .get<string>("KAFKA_BROKERS", "localhost:9092")
                    .split(","),
                  retry: {
                    retries: 5,
                    initialRetryTime: 300,
                    maxRetryTime: 30000,
                  },
                },
                consumer: {
                  groupId: options.groupId,
                  allowAutoTopicCreation: true,
                },
                producer: {
                  allowAutoTopicCreation: true,
                  retry: {
                    retries: 5,
                    initialRetryTime: 300,
                    maxRetryTime: 30000,
                  },
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      providers: [KafkaService],
      exports: [KafkaService, ClientsModule],
    };
  }
}
