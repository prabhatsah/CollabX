import {
  USER_ORG_SERVICE_NAME,
  UserOrgServiceClient,
} from '@app/common/proto/user-org';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { InviteUserDto } from './dto/invite-user.dto';

@Injectable()
export class InvitationService implements OnModuleInit {
  private readonly logger = new Logger(InvitationService.name);
  private userOrganizationClient: UserOrgServiceClient;

  constructor(@Inject(USER_ORG_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userOrganizationClient = this.client.getService<UserOrgServiceClient>(
      USER_ORG_SERVICE_NAME,
    );
  }

  async inviteUser(req: InviteUserDto) {
    const res = await lastValueFrom(
      this.userOrganizationClient.inviteUser(req),
    );
    this.logger.log(`User invited with email: ${req.email}`);
  }
}
