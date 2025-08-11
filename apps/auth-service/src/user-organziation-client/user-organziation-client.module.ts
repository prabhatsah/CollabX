import { Module } from "@nestjs/common";
import { UserOrganizationClientService } from "./user-organziation-client.service";
import { KafkaModule } from "@app/kafka";

@Module({
  imports: [
    KafkaModule.register({
      clientId: "user-org-client",
      groupId: "user-org-group",
    }),
  ],
  providers: [UserOrganizationClientService],
  exports: [UserOrganizationClientService],
})
export class UserOrganizationClientModule {}
