import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserEventConsumer } from "./consumers/user-event.consumer";
import { OrganizationEventConsumer } from "./consumers/organization-event.consumer";
import { UserEventProducer } from "./producers/user-event.producer";
import { OrganizationEventProducer } from "./producers/organization-event.producer";
import { UsersModule } from "../users/users.module";
import { OrganizationsModule } from "../organizations/organizations.module";
import { MembershipsModule } from "../memberships/memberships.module";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "user-organization-service",
            brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
          },
          consumer: {
            groupId: "user-organization-service-group",
          },
        },
      },
    ]),
    UsersModule,
    OrganizationsModule,
    MembershipsModule,
  ],
  providers: [
    UserEventConsumer,
    OrganizationEventConsumer,
    UserEventProducer,
    OrganizationEventProducer,
  ],
  exports: [UserEventProducer, OrganizationEventProducer],
})
export class KafkaModule {}
