import { Module } from "@nestjs/common";
import { AuthEventsProducer } from "./producers/auth-events.producer";
import { KafkaCoreModule } from "./kafka-core.module";

@Module({
  imports: [KafkaCoreModule],
  providers: [AuthEventsProducer],
  exports: [AuthEventsProducer],
})
export class KafkaProducersModule {}
