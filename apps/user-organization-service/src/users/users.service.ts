import {
  CreateUserAndOrgRequest,
  GetSessionRequest,
  GetUserByAuthIdRequest,
  OrgSummary,
} from '@app/common/proto/user-org';
import { Injectable, Logger } from '@nestjs/common';
import { OrganizationService } from '../organizations/organization.service';
import { MembershipService } from '../memberships/membership.service';
import { PrismaService } from '../database/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { log } from 'console';

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
        this.logger.log(`Step 1/3: User created: ${newUser.id}`);

        // Delegate Organization creation to OrganizationsService
        const newOrganization =
          await this.organizationService.createOrganization(
            { createdBy: newUser.id, organizationName },
            tx,
          );
        this.logger.log(`Step 2/3: Org created: ${newOrganization.id}`);

        // Delegate Membership creation to MembershipsService
        const newMembership = await this.membershipService.createMembership(
          { userId: newUser.id, organizationId: newOrganization.id },
          tx,
        );
        this.logger.log(`Step 2/3: Org created: ${newMembership.id}`);

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
      const currentOrg: OrgSummary | null =
        organizations.length > 0 ? organizations[0] : null;

      this.logger.log(`User session fetched: ${user.email}`);

      const session = {
        userInfo: {
          id: user.id,
          authUserId,
          fullName: user.fullName,
          email: user.email,
        },
        organizations,
        currentOrg,
      };

      console.log('Session:', session);

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
        memberships: organizations,
      };

      this.logger.verbose(`User info: ${JSON.stringify(user)}`);

      return { user };
    } catch (error) {
      this.logger.error(`Transaction failed for ${authUserId}.`, error);
      throw error;
    }
  }
}
