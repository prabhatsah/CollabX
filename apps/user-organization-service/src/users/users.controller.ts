import { SERVICE_NAMES } from '@app/common';
import type {
  CreateUserAndOrgRequest,
  GetSessionRequest,
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
}
