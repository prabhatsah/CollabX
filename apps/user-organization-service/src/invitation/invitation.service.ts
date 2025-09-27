import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { InviteUserRequest } from '@app/common/proto/user-org';
import { randomUUID } from 'crypto';

@Injectable()
export class InvitationService {
  private readonly logger = new Logger(InvitationService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async inviteUser(req: InviteUserRequest) {
    const { orgId, email, role, invitedByUserId } = req;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        memberships: true,
      },
    });

    // If user already created in the CollabX
    if (existingUser) {
      //const alreadyMember = await this.prismaService.
      console.log('-------ALready member:', existingUser);
    }

    const token = randomUUID();
    const expiredAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  }
}
