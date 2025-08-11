import { Module } from "@nestjs/common";
import { KafkaCoreModule } from "./kafka-core.module";
import { AuthEventsConsumer } from "./consumers/auth-events.consumer";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [KafkaCoreModule],
  controllers: [AuthEventsConsumer],
})
export class KafkaConsumersModule {}
