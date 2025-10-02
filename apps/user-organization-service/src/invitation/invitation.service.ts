import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  AcceptInvitationRequest,
  InviteUserRequest,
} from '@app/common/proto/user-org';
import { randomUUID } from 'crypto';
import { status } from '@grpc/grpc-js';
import { UserOrgEventsProducer } from '../kafka/kafka.producer';
import { type ClientGrpc, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AuthServiceClient, formatDate } from '@app/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InvitationService implements OnModuleInit {
  private readonly logger = new Logger(InvitationService.name);

  private authServiceClient: AuthServiceClient;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userOrgEventsProducer: UserOrgEventsProducer,
    @Inject(AUTH_SERVICE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async inviteUser(req: InviteUserRequest) {
    const { organizationId, email, role, invitedById, organizationName } = req;
    console.log('req in inviteUser:', req);

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        memberships: true,
      },
    });

    // If user already created in the CollabX
    if (existingUser) {
      this.logger.log(`User already belongs some some organization: ${email}`);

      // Check if user already belongs to this organization
      const isAlreadyMember = existingUser.memberships?.find(
        (membership) => membership.organizationId === organizationId,
      );

      if (isAlreadyMember) {
        this.logger.error(
          `User already belongs to this organziation: ${email}`,
        );

        throw new RpcException({
          code: status.ALREADY_EXISTS,
          message: 'User already belongs to this organziation',
        });
      }

      // If user doesn't belongs to this organization then add them directly and emit event
      const newMembership = await this.prismaService.membership.create({
        data: {
          userId: existingUser.id,
          organizationId,
          role,
        },
      });
      this.logger.log(
        `User directly added without invitation request: ${email}`,
      );

      // Record an invitation (auto-accepted)
      const invitation = await this.prismaService.invitation.create({
        data: {
          organizationId,
          email,
          role,
          invitedById,
          status: 'ACCEPTED',
          acceptedAt: new Date(),
          token: randomUUID(),
          expiresAt: new Date(),
        },
      });
      this.logger.log(`Invitation record created and auto accepted: ${email}`);

      // Producer user invitation event
      await this.userOrgEventsProducer.invitationAccepted({
        email,
        userName: existingUser.fullName,
        organizationId: invitation.organizationId,
        organizationName,
        role: invitation.role,
        invitedById: invitation.invitedById,
        acceptedAt: invitation.acceptedAt,
      });
      this.logger.log(`Event produced for accepted invitation: ${email}`);

      return invitation;
    }

    // If user doesn't exist in the collabX then invite them and then create their user
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    const token = randomUUID();

    const invitation = await this.prismaService.invitation.create({
      data: {
        organizationId,
        email,
        role,
        invitedById,
        status: 'PENDING',
        acceptedAt: null,
        token,
        expiresAt,
      },
    });

    // Producer user invitation event
    await this.userOrgEventsProducer.invitationCreated({
      email: invitation.email,
      organizationId: invitation.organizationId,
      organizationName,
      role: invitation.role,
      invitedById: invitation.invitedById,
      token: invitation.token,
      invitedAt: formatDate(invitation.createdAt),
      expiresAt: formatDate(invitation.expiresAt),
    });
    this.logger.log(`Event produced for invitation created: ${email}`);

    return invitation;
  }

  async acceptInvitation(req: AcceptInvitationRequest) {
    const { fullName, token, password } = req;
    console.log('Req in invitation:', req);

    const invitation = await this.prismaService.invitation.findUnique({
      where: { token },
    });

    // If no invitaion found
    if (!invitation) {
      this.logger.error(`Invalid invitation token`);

      throw new RpcException({
        code: status.UNAVAILABLE,
        message: 'Invalid invitation token',
      });
    }

    // If invitation is not pending
    if (invitation.status !== 'PENDING') {
      this.logger.error(`Invitation already used or expired`);

      throw new RpcException({
        code: status.UNAVAILABLE,
        message: 'Invitation already used or expired',
      });
    }

    // If token is expired
    if (new Date() > invitation.expiresAt) {
      this.logger.error(`Invitation expired`);

      throw new RpcException({
        code: status.UNAVAILABLE,
        message: 'Invitation expired',
      });
    }

    // If everything is fine, then create authUser
    const authRes = await firstValueFrom(
      this.authServiceClient.createAuthUser({
        email: invitation.email,
        password: password,
      }),
    );

    if (!authRes) {
      this.logger.error(`Error occured while creating auth user`);
      return {
        success: false,
        message: 'Error occured while creating auth user',
      };
    }
    this.logger.log('Created Auth User');

    const newUser = await this.prismaService.user.create({
      data: {
        authUserId: authRes.authUserId,
        email: invitation.email,
        fullName,
        defaultOrgId: invitation.organizationId,
      },
    });
    this.logger.log(`User created: ${invitation.email}`);

    await this.prismaService.membership.create({
      data: {
        userId: newUser.id,
        organizationId: invitation.organizationId,
        role: invitation.role,
      },
    });
    this.logger.log(`Membership establised: ${newUser.email}`);

    // Fetch organization details so taht we can send the organization name to event
    const orgDetails = await this.prismaService.organization.findUnique({
      where: { id: invitation.organizationId },
    });

    // mark invitation as accepted
    await this.prismaService.invitation.update({
      where: { id: invitation.id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });

    // Producer invitation accept event
    await this.userOrgEventsProducer.invitationAccepted({
      email: invitation.email,
      userName: fullName,
      organizationId: invitation.organizationId,
      organizationName: orgDetails?.name,
      role: invitation.role,
      invitedById: invitation.invitedById,
      acceptedAt: invitation.acceptedAt,
    });
    this.logger.log(
      `Event produced for invitation accepted: ${invitation.email}`,
    );

    return { success: true, message: 'Invitation accepted' };
  }
}
