// services/user-organization-client.service.ts
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { firstValueFrom, timeout } from "rxjs";

export interface UserOrganization {
  organizationId: string;
  organizationName: string;
  role: string;
  isActive: boolean;
  joinedAt: string;
}

@Injectable()
export class UserOrganizationClientService implements OnModuleInit {
  private readonly logger = new Logger(UserOrganizationClientService.name);

  constructor(
    @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka
  ) {}

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf("user-org.get_user_organizations");
  }

  /**
   * Get user's organizations via Kafka request-response pattern
   */
  async getUserOrganizations(authUserId: string): Promise<UserOrganization[]> {
    try {
      this.logger.log(`Fetching organizations for auth user: ${authUserId}`);

      // Send request to User-Org Service via Kafka
      const response$ = this.kafkaClient.send(
        "user-org.get_user_organizations",
        {
          authUserId,
          timestamp: new Date().toISOString(),
        }
      );

      // Wait for response with timeout
      const response = await firstValueFrom(response$.pipe(timeout(5000)));

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch user organizations");
      }

      this.logger.log(
        `Found ${response.organizations.length} organizations for user: ${authUserId}`
      );

      return response.organizations;
    } catch (error) {
      this.logger.error(`Failed to get user organizations: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify user belongs to specific organization
   */
  async verifyUserOrganizationAccess(
    authUserId: string,
    organizationId: string
  ): Promise<UserOrganization | null> {
    try {
      const organizations = await this.getUserOrganizations(authUserId);

      const userOrg = organizations.find(
        (org) => org.organizationId === organizationId && org.isActive
      );

      return userOrg || null;
    } catch (error) {
      this.logger.error(
        `Failed to verify user organization access: ${error.message}`
      );
      return null;
    }
  }

  /**
   * Check if user has specific role in organization
   */
  async hasRole(
    authUserId: string,
    organizationId: string,
    requiredRole: string
  ): Promise<boolean> {
    try {
      const userOrg = await this.verifyUserOrganizationAccess(
        authUserId,
        organizationId
      );

      if (!userOrg) {
        return false;
      }

      // Define role hierarchy
      const roleHierarchy = {
        OWNER: 4,
        ADMIN: 3,
        MANAGER: 2,
        MEMBER: 1,
      };

      const userRoleLevel = roleHierarchy[userOrg.role] || 0;
      const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

      return userRoleLevel >= requiredRoleLevel;
    } catch (error) {
      this.logger.error(`Failed to check user role: ${error.message}`);
      return false;
    }
  }
}
