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
@UseGuards(OrgRoleGuard)
export class UserOrgController {
  private readonly logger = new Logger(UserOrgController.name);

  constructor(private readonly userOrgService: UserOrgService) {}

  @Get(':organizationId/users')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  async getUsersInOrganization(
    @Param('organizationId') organizationId: string,
    @CurrentUser() user: SessionUser,
  ) {
    console.log(`Current user session:`, user);

    return await this.userOrgService.getUsersInOrg({ organizationId });
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
