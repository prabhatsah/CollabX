import { Injectable, Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_TOPICS, MembershipRole } from "@app/common";

@Injectable()
export class OrganizationEventProducer {
  constructor(
    @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka
  ) {}

  async publishOrganizationCreated(
    organizationId: string,
    createdById: string
  ) {
    try {
      await this.kafkaClient.emit(KAFKA_TOPICS.ORGANIZATION_CREATED, {
        organizationId,
        createdById,
        timestamp: new Date().toISOString(),
        service: "user-organization-service",
      });
    } catch (error) {
      console.error("Error publishing organization created event:", error);
    }
  }

  async publishMemberAdded(
    userId: string,
    organizationId: string,
    role: MembershipRole,
    addedBy?: string
  ) {
    try {
      await this.kafkaClient.emit(KAFKA_TOPICS.MEMBER_ADDED, {
        userId,
        organizationId,
        role,
        addedBy,
        timestamp: new Date().toISOString(),
        service: "user-organization-service",
      });
    } catch (error) {
      console.error("Error publishing member added event:", error);
    }
  }

  async publishMemberRemoved(
    userId: string,
    organizationId: string,
    removedBy?: string
  ) {
    try {
      await this.kafkaClient.emit(KAFKA_TOPICS.MEMBER_REMOVED, {
        userId,
        organizationId,
        removedBy,
        timestamp: new Date().toISOString(),
        service: "user-organization-service",
      });
    } catch (error) {
      console.error("Error publishing member removed event:", error);
    }
  }

  async publishMemberRoleChanged(
    userId: string,
    organizationId: string,
    oldRole: MembershipRole,
    newRole: MembershipRole,
    changedBy: string
  ) {
    try {
      await this.kafkaClient.emit(KAFKA_TOPICS.MEMBER_ROLE_CHANGED, {
        userId,
        organizationId,
        oldRole,
        newRole,
        changedBy,
        timestamp: new Date().toISOString(),
        service: "user-organization-service",
      });
    } catch (error) {
      console.error("Error publishing member role changed event:", error);
    }
  }
}
