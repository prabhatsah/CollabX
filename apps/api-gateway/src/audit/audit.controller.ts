import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { ApiResponseDto } from '@app/common/dto/response.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type SessionUser } from '@app/common/interfaces';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  @HttpCode(HttpStatus.OK)
  async getlogs(
    @Query('limit') limit?: number,
    @CurrentUser() user: SessionUser,
  ) {
    const orgId = user.currentOrg?.id;
    const res = await this.auditService.getlogs({ limit, orgId });
    return ApiResponseDto.success(res, 'Logs fetched sucessfully');
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return this.auditService.checkHealth();
  }
}
