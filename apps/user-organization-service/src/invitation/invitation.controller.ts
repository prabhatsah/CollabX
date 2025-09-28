import { Controller } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { GrpcMethod } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@app/common';
import {
  type AcceptInvitationRequest,
  type InviteUserRequest,
} from '@app/common/proto/user-org';

@Controller()
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @GrpcMethod(SERVICE_NAMES.USER_ORG_SERVICE, 'InviteUser')
  inviteUser(req: InviteUserRequest) {
    return this.invitationService.inviteUser(req);
  }

  @GrpcMethod(SERVICE_NAMES.USER_ORG_SERVICE, 'AcceptInvitation')
  acceptInvitation(req: AcceptInvitationRequest) {
    return this.invitationService.acceptInvitation(req);
  }
}
