import { SERVICE_NAMES } from '@app/common';
import {
  type GetUserByAuthIdRequest,
  USER_ORG_SERVICE_NAME,
  type CreateUserAndOrgRequest,
  type GetSessionRequest,
  type UpdateDefaultOrgRequest,
} from '@app/common/proto/user-org';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(SERVICE_NAMES.USER_ORG_SERVICE, 'CreateUserAndOrg')
  createUserAndOrg(request: CreateUserAndOrgRequest) {
    return this.userService.createUserAndOrg(request);
  }

  @GrpcMethod(SERVICE_NAMES.USER_ORG_SERVICE, 'GetSession')
  getSession(request: GetSessionRequest) {
    return this.userService.getSession(request);
  }

  @GrpcMethod(USER_ORG_SERVICE_NAME, 'GetUserByAuthId')
  async getUserByAuthId(request: GetUserByAuthIdRequest) {
    return this.userService.getUserByAuthId(request);
  }

  @GrpcMethod(USER_ORG_SERVICE_NAME, 'UpdateDefaultOrg')
  async updateDefaultOrg(request: UpdateDefaultOrgRequest) {
    return this.userService.updateDefaultOrg(request);
  }
}
