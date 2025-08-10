import { Module } from "@nestjs/common";
import { AuthEventsProducer } from "./producers/auth-events.producer";
import { KafkaModule } from "libs/kafka/src";

@Module({
  imports: [
    KafkaModule.register({
      clientId: "auth-service",
      groupId: "auth-service-group",
    }),
  ],
  exports: [KafkaModule],
})
export class KafkaCoreModule {}
