import { Module } from "@nestjs/common";
import { KafkaCoreModule } from "./kafka-core.module";
import { AuthEventsConsumer } from "./consumers/auth-events.consumer";

@Module({
  imports: [KafkaCoreModule],
  controllers: [AuthEventsConsumer],
})
export class KafkaConsumersModule {}
