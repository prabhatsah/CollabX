import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { SupportTicketService } from './support-ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { type SessionUser } from '@app/common/interfaces';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiResponseDto } from '@app/common/dto/response.dto';

@Controller('ticket')
export class SupportTicketController {
  constructor(private readonly supportTicketService: SupportTicketService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'Ticket created successfully' })
  async createTicket(
    @Body() request: CreateTicketDto,
    @CurrentUser() user: SessionUser,
  ) {
    console.log('Req:', user);

    // Attaching creator userId to the request
    request = {
      ...request,
      createdByUserId: user.userInfo.id,
    };

    const res = await this.supportTicketService.createTicket(request);
    return ApiResponseDto.success(res, 'Ticket created sucessfully');
  }
}
