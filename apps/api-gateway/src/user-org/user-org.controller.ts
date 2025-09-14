import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserOrgService } from './user-org.service';

import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { OrgRoleGuard } from '../common/guards/org-role.guard';
import type { SessionUser } from '@app/common/interfaces/sesion-user.interface';

@Controller('organizations')
//@UseGuards(OrgRoleGuard) //Will allow only authenticated users to fetch ticket list
export class UserOrgController {
  private readonly logger = new Logger(UserOrgController.name);

  constructor(private readonly userOrgService: UserOrgService) {}

  @Get(':organizationId/users')
  @HttpCode(HttpStatus.OK)
  //@Roles('ADMIN', 'SUPPORT')
  async getUsersInOrganization(
    @Param('organizationId') organizationId: string,
    @CurrentUser() user: SessionUser,
  ) {
    const res = await this.userOrgService.getUsersInOrg({ organizationId });
    console.log('res:', res);
    return res;
  }

  // @Post('signup')
  // @HttpCode(HttpStatus.CREATED)
  // createUserAndOrg(@Body() createUserOrgUserRequest: CreateUserAndOrgRequest) {
  //   return this.userOrgService.createUserAndOrg(createUserOrgUserRequest);
  // }

  // @Get('health')
  // @HttpCode(HttpStatus.OK)
  // healthCheck() {
  //   return this.userOrgService.checkHealth();
  // }
}
