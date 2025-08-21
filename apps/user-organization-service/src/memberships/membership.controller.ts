import { Controller } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { GrpcMethod } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@app/common';
import type { GetUsersInOrgRequest } from '@app/common/proto/user-org';

@Controller()
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @GrpcMethod(SERVICE_NAMES.USER_ORG_SERVICE, 'GetUsersInOrg')
  async getUsersInOrg(request: GetUsersInOrgRequest) {
    return await this.membershipService.getUsersInOrg(request);
  }
}
