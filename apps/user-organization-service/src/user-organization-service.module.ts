import { Module } from "@nestjs/common";
import { UserOrganizationServiceController } from "./user-organization-service.controller";
import { UserOrganizationServiceService } from "./user-organization-service.service";

@Module({
  imports: [],
  controllers: [UserOrganizationServiceController],
  providers: [UserOrganizationServiceService],
})
export class UserOrganizationServiceModule {}
