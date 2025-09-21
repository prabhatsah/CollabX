import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserOrgService } from './user-org.service';

import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { OrgRoleGuard } from '../common/guards/org-role.guard';
import type { SessionUser } from '@app/common/interfaces/sesion-user.interface';
import { SessionService } from '../session/session.service';

@Controller('organizations')
//@UseGuards(OrgRoleGuard) //Will allow only authenticated users to fetch ticket list
export class UserOrgController {
  private readonly logger = new Logger(UserOrgController.name);

  constructor(
    private readonly userOrgService: UserOrgService,
    @Inject(forwardRef(() => SessionService))
    private readonly sessionService: SessionService,
  ) {}

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

  @Patch('default-org')
  @HttpCode(HttpStatus.OK)
  async updateDefaultOrg(
    @Body('organizationId') organizationId: string,
    @CurrentUser() user: SessionUser,
  ) {
    const userId = user.userInfo.id;

    const res = await this.userOrgService.updateDefaultOrg({
      userId,
      organizationId,
    });

    const authUserId = user.userInfo.authUserId;
    await this.sessionService.updateCurrentOrg(
      authUserId,
      organizationId,
      true,
    );

    return res;
  }
}
