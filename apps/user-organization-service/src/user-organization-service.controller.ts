import { Controller, Get } from "@nestjs/common";
import { UserOrganizationServiceService } from "./user-organization-service.service";

@Controller()
export class UserOrganizationServiceController {
  constructor(
    private readonly userOrganizationServiceService: UserOrganizationServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.userOrganizationServiceService.getHello();
  }
}
