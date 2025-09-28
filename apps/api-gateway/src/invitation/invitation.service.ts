import {
  USER_ORG_SERVICE_NAME,
  UserOrgServiceClient,
} from '@app/common/proto/user-org';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  AcceptInvitationRequestDto,
  InviteUserDto,
} from './dto/invitation.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class InvitationService implements OnModuleInit {
  private readonly logger = new Logger(InvitationService.name);
  private userOrganizationClient: UserOrgServiceClient;

  constructor(
    @Inject(USER_ORG_SERVICE_NAME) private client: ClientGrpc,
    private readonly authService: AuthService,
  ) {}

  onModuleInit() {
    this.userOrganizationClient = this.client.getService<UserOrgServiceClient>(
      USER_ORG_SERVICE_NAME,
    );
  }

  async inviteUser(req: InviteUserDto) {
    const res = await lastValueFrom(
      this.userOrganizationClient.inviteUser(req),
    );
    this.logger.debug(`User invited: ${JSON.stringify(res)}`);
  }

  async acceptInvitation(req: AcceptInvitationRequestDto) {
    const res = await lastValueFrom(
      this.userOrganizationClient.acceptInvitation(req),
    );

    if (!res.success) {
      this.logger.error(
        `Error occured while accepting invitation: ${res.message}`,
      );
      return {
        success: res.success,
        message: res.message,
      };
    }

    this.logger.debug(`Invitation accepted: ${JSON.stringify(res)}`);
  }
}
