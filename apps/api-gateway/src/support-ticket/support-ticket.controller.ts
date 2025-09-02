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
import { ListTicketsDto } from './dto/list-tickets.dto';

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
    // Attaching creator userId and orgId to the request
    request = {
      ...request,
      createdByUserId: user.userInfo.id,
      orgId: user.currentOrg?.id || '',
      orgName: user.currentOrg?.name || '',
    };

    const res = await this.supportTicketService.createTicket(request);
    return ApiResponseDto.success(res, 'Ticket created sucessfully');
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List tickets' })
  @ApiResponse({ status: 201, description: 'Tickets fetched sucsessfully' })
  async listTickets(
    @Body() request: ListTicketsDto,
    @CurrentUser() user: SessionUser,
  ) {
    // Attaching creator userId and orgId to the request
    request = {
      ...request,
      createdByUserId: user.userInfo.id,
      orgId: user.currentOrg?.id || '',
    };

    const res = await this.supportTicketService.listTickets(request);

    return ApiResponseDto.success(res, 'Ticket fetched sucessfully');
  }
}
