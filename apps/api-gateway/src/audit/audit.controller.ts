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

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  @HttpCode(HttpStatus.OK)
  async getlogs(@Query('limit') limit?: number) {
    const res = await this.auditService.getlogs({ limit });

    console.log('Logs', res);

    return ApiResponseDto.success(res, 'Logs fetched sucessfully');
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return this.auditService.checkHealth();
  }
}
