import { Injectable } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { OrganizationsService } from "../../organizations/organizations.service";
import { MembershipsService } from "../../memberships/memberships.service";
import { KAFKA_TOPICS } from "@app/common";

@Injectable()
export class OrganizationEventConsumer {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly membershipsService: MembershipsService
  ) {}

  @EventPattern(KAFKA_TOPICS.ORGANIZATION_CREATED)
  async handleOrganizationCreated(@Payload() data: any) {
    try {
      console.log("Processing organization created event:", data);
      // Handle any post-creation logic here
      // e.g., send welcome emails, setup default settings, etc.
    } catch (error) {
      console.error("Error processing organization created event:", error);
    }
  }

  @EventPattern(KAFKA_TOPICS.MEMBER_ADDED)
  async handleMemberAdded(@Payload() data: any) {
    try {
      console.log("Processing member added event:", data);
      // Handle post-addition logic
      // e.g., send welcome email, audit logging, etc.
    } catch (error) {
      console.error("Error processing member added event:", error);
    }
  }
}
