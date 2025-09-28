import { Injectable, Logger } from '@nestjs/common';
import { MembershipCreateRequestDto } from '../shared/dto/membershipCreate.dto';
import { Prisma } from 'apps/user-organization-service/prisma/generated/client';
import { PrismaService } from '../database/prisma.service';
import { GetUsersInOrgRequest } from '@app/common/proto/user-org';

@Injectable()
export class MembershipService {
  private readonly logger = new Logger(MembershipService.name);

  constructor(private readonly prismaService: PrismaService) {}

  //Membership creation transaction, called from user module
  async createMembership(
    dto: MembershipCreateRequestDto,
    tx: Prisma.TransactionClient,
  ) {
    const { userId, organizationId } = dto;

    const res = await tx.membership.create({
      data: {
        userId,
        organizationId,
        role: 'ADMIN',
      },
    });

    return res;
  }

  async getUsersInOrg(request: GetUsersInOrgRequest) {
    const { organizationId } = request;

    this.logger.log(`User fetch request with orgId: ${organizationId}`);

    const memberships = await this.prismaService.membership.findMany({
      where: { organizationId },
      include: { user: true },
    });

    const users = memberships.map((m) => ({
      userId: m.user.id,
      fullName: m.user.fullName || '',
      email: m.user.email,
      role: m.role,
    }));

    return { users };
  }
}
