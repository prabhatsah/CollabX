import { Test, TestingModule } from "@nestjs/testing";
import { UserOrganizationServiceController } from "./user-organization-service.controller";
import { UserOrganizationServiceService } from "./user-organization-service.service";

describe("UserOrganizationServiceController", () => {
  let userOrganizationServiceController: UserOrganizationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserOrganizationServiceController],
      providers: [UserOrganizationServiceService],
    }).compile();

    userOrganizationServiceController =
      app.get<UserOrganizationServiceController>(
        UserOrganizationServiceController,
      );
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(userOrganizationServiceController.getHello()).toBe("Hello World!");
    });
  });
});
