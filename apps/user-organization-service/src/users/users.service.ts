import {
  CreateUserAndOrgRequest,
  GetSessionRequest,
  GetUserByAuthIdRequest,
  OrgSummary,
  UpdateDefaultOrgRequest,
} from '@app/common/proto/user-org';
import { Injectable, Logger } from '@nestjs/common';
import { OrganizationService } from '../organizations/organization.service';
import { MembershipService } from '../memberships/membership.service';
import { PrismaService } from '../database/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly organizationService: OrganizationService,
    private readonly membershipService: MembershipService,
    private readonly prismaService: PrismaService,
  ) {}

  async createUserAndOrg(request: CreateUserAndOrgRequest) {
    const { authUserId, email, organizationName, fullName } = request;
    this.logger.log(`Starting transaction for authUserId: ${authUserId}`);

    try {
      const res = await this.prismaService.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            authUserId,
            email,
            fullName,
          },
        });
        this.logger.log(`Step 1/4: User created: ${newUser.id}`);

        // Delegate Organization creation to OrganizationsService
        const newOrganization =
          await this.organizationService.createOrganization(
            { createdBy: newUser.id, organizationName },
            tx,
          );
        this.logger.log(`Step 2/4: Org created: ${newOrganization.id}`);

        // Delegate Membership creation to MembershipsService
        const newMembership = await this.membershipService.createMembership(
          {
            userId: newUser.id,
            organizationId: newOrganization.id,
          },
          tx,
        );
        this.logger.log(`Step 3/4: Membership establised: ${newMembership.id}`);

        // Update the user’s defaultOrgId
        await tx.user.update({
          where: { id: newUser.id },
          data: { defaultOrgId: newOrganization.id },
        });
        this.logger.log(
          `Step 4/4: Default org set for user ${newUser.id} -> ${newOrganization.id}`,
        );

        return {
          userId: newUser.id,
          organizationId: newOrganization.id,
          membershipId: newMembership.id,
        };
      });

      return res;
    } catch (error) {
      this.logger.error(
        `Transaction failed for ${authUserId}. Rolling back.`,
        error,
      );
      throw error;
    }
  }

  async getSession(request: GetSessionRequest) {
    const { authUserId } = request;
    this.logger.log(
      `Starting transaction for gathering sesion data: ${authUserId}`,
    );

    try {
      const user = await this.prismaService.user.findUnique({
        where: { authUserId },
        include: {
          memberships: {
            where: { status: 'ACTIVE' },
            include: {
              organization: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
            orderBy: { joinedAt: 'asc' },
          },
        },
      });
      console.log('User info in session:', user);

      if (!user) {
        this.logger.log(`User not found: ${authUserId}`);

        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'User not found',
        });
      }

      // map memberships -> OrgSummary[]
      const organizations: OrgSummary[] = user.memberships.map(
        (membership) => ({
          id: membership.organization.id,
          name: membership.organization.name,
          role: membership.role,
        }),
      );

      // pick first org as currentOrg (or implement your own logic)
      // const currentOrg: OrgSummary | null =
      //   organizations.length > 0 ? organizations[0] : null;

      const matchedMembership = user.memberships.find(
        (membership) => membership.organization.id === user.defaultOrgId,
      );
      const defaultOrg: OrgSummary = matchedMembership
        ? {
            id: matchedMembership.organization.id,
            name: matchedMembership.organization.name,
            role: matchedMembership.role,
          }
        : {};
      const currentOrg: OrgSummary = defaultOrg;

      const session = {
        userInfo: {
          id: user.id,
          authUserId,
          fullName: user.fullName,
          email: user.email,
        },
        organizations,
        currentOrg,
        defaultOrg,
      };

      this.logger.log(`User session fetched:`, JSON.stringify(session));

      return session;
    } catch (error) {
      this.logger.error(`Session fetch failed for ${authUserId}: ${error}`);

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Session fetch failed',
      });
    }
  }

  async getUserByAuthId(request: GetUserByAuthIdRequest) {
    const { authUserId } = request;
    this.logger.debug(`Started fetching user complete info: ${authUserId}`);

    try {
      const userDetails = await this.prismaService.user.findUnique({
        where: {
          authUserId,
        },
        include: {
          memberships: {
            include: {
              organization: true,
            },
          },
        },
      });

      const organizations = userDetails?.memberships.map((membership) => ({
        orgId: membership.organizationId,
        orgName: membership.organization.name,
        role: membership.role,
      }));

      const user = {
        userId: userDetails?.id,
        authUserId: userDetails?.authUserId,
        fullName: userDetails?.fullName,
        email: userDetails?.email,
        defaultOrgId: userDetails?.defaultOrgId,
        memberships: organizations,
      };

      this.logger.verbose(`User info: ${JSON.stringify(user)}`);

      return { user };
    } catch (error) {
      this.logger.error(`Transaction failed for ${authUserId}.`, error);
      throw error;
    }
  }

  async updateDefaultOrg(request: UpdateDefaultOrgRequest) {
    const { userId, organizationId } = request;
    this.logger.log(
      `Updating default org for userId: ${userId} -> ${organizationId}`,
    );

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { memberships: true },
    });

    if (!user) {
      this.logger.log(`User with userId ${userId} not found`);

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    // Ensure user is member of the target org
    const isMember = user.memberships.some(
      (m) => m.organizationId === organizationId,
    );

    if (!isMember) {
      this.logger.log(
        `User ${userId} is not a member of organization ${organizationId}`,
      );

      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User is not a member of organization',
      });
    }

    // Update default org
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { defaultOrgId: organizationId },
    });

    this.logger.log(
      `Default org updated for user ${userId} -> ${organizationId}`,
    );

    return {
      success: true,
      defaultOrgId: updatedUser.defaultOrgId,
    };
  }
}
