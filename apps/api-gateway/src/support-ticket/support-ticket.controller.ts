import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SupportTicketService } from './support-ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { type SessionUser } from '@app/common/interfaces';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiResponseDto } from '@app/common/dto/response.dto';
// import { ListTicketsDto } from './dto/list-tickets.dto';
import { AssignTicketDto } from './dto/ticket-assign.dto';
import {
  CreateTicketRequest,
  type ListTicketsRequest,
} from '@app/common/proto/support-ticket';
import { TransitionStatusDto } from './dto/transition-status.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { LockUnlockTicketDto } from './dto/lock-unlock.dto';
import { OrgRoleGuard } from '../common/guards/org-role.guard';
import { Roles } from '../common/decorators/roles.decorator';

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
    const serviceReq: CreateTicketRequest = {
      ...request,
      createdByUserId: user.userInfo.id,
      userName: user.userInfo.fullName,
      orgId: user.currentOrg?.id || '',
      orgName: user.currentOrg?.name || '',
      userEmail: user.userInfo.email,
    };

    const res = await this.supportTicketService.createTicket(serviceReq);
    return ApiResponseDto.success(res, 'Ticket created sucessfully');
  }

  @Get(':ticketId/ticketActivityItem')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List ticket activity items' })
  @ApiResponse({
    status: 200,
    description: 'Ticket activity items fetched sucsessfully',
  })
  async listTicketActivity(@Param('ticketId') ticketId: string) {
    const res = await this.supportTicketService.listTicketActivity(ticketId);

    return ApiResponseDto.success(
      res,
      'Ticket activity items fetched sucessfully',
    );
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List tickets' })
  @ApiResponse({ status: 201, description: 'Tickets fetched sucsessfully' })
  async listTickets(
    @Body() request: ListTicketsRequest,
    @CurrentUser() user: SessionUser,
  ) {
    // Attaching creator userId and orgId to the request
    request = {
      ...request,
      orgId: user.currentOrg?.id ?? '',
      actor: {
        userId: user.userInfo.id,
        role: user.currentOrg?.role ?? '',
      },
    };

    const res = await this.supportTicketService.listTickets(request);

    return ApiResponseDto.success(res, 'Ticket fetched sucessfully');
  }

  @Patch(':ticketId/assign')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN', 'SUPPORT')
  @UseGuards(OrgRoleGuard)
  @ApiOperation({ summary: 'Assign user' })
  @ApiResponse({ status: 201, description: 'User assigned sucsessfully' })
  async assignTicket(
    @Param('ticketId') ticketId: string,
    @Body() request: AssignTicketDto,
    @CurrentUser() user: SessionUser,
  ) {
    // Attaching creator actorUserId and orgId to the request
    request = {
      ...request,
      ticketId,
      actorUserId: user.userInfo.id,
      orgId: user.currentOrg?.id || '',
    };

    const res = await this.supportTicketService.assignTicket(request);

    return ApiResponseDto.success(res, 'User assigned sucessfully');
  }

  @Patch(':ticketId/lock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lock a ticket' })
  @ApiResponse({ status: 200, description: 'Ticket locked successfully' })
  async lockSpecificTicket(
    @Param('ticketId') ticketId: string,
    @Body() request: LockUnlockTicketDto,
    @CurrentUser() user: SessionUser,
  ) {
    // Attaching creator actorUserId and orgId to the request
    request = {
      ...request,
      ticketId,
      actorUserId: user.userInfo.id,
      orgId: user.currentOrg?.id,
    };

    const res = await this.supportTicketService.lockTicket(request);

    return ApiResponseDto.success(res, 'Ticket locked successfully');
  }

  @Patch(':ticketId/transition-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Transition status' })
  @ApiResponse({ status: 200, description: 'Status updated sucsessfully' })
  async transitionStatus(
    @Param('ticketId') ticketId: string,
    @Body() request: TransitionStatusDto,
    @CurrentUser() user: SessionUser,
  ) {
    // Attaching creator actorUserId and orgId to the request
    request = {
      ...request,
      ticketId,
      actorUserId: user.userInfo.id,
      orgId: user.currentOrg?.id,
    };

    const res = await this.supportTicketService.transitionStatus(request);

    return ApiResponseDto.success(res, 'Status updated sucessfully');
  }

  @Patch(':ticketId/update-priority')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update priority' })
  @ApiResponse({ status: 200, description: 'Priority updated sucsessfully' })
  async updatePriority(
    @Param('ticketId') ticketId: string,
    @Body() request: UpdatePriorityDto,
    @CurrentUser() user: SessionUser,
  ) {
    // Attaching creator actorUserId and orgId to the request
    request = {
      ...request,
      ticketId,
      actorUserId: user.userInfo.id,
      orgId: user.currentOrg?.id,
    };

    const res = await this.supportTicketService.updatePriority(request);

    return ApiResponseDto.success(res, 'Priority updated sucessfully');
  }

  @Patch(':ticketId/update-type')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update type' })
  @ApiResponse({ status: 200, description: 'Type updated sucsessfully' })
  async updateType(
    @Param('ticketId') ticketId: string,
    @Body() request: UpdateTypeDto,
    @CurrentUser() user: SessionUser,
  ) {
    // Attaching creator actorUserId and orgId to the request
    request = {
      ...request,
      ticketId,
      actorUserId: user.userInfo.id,
      orgId: user.currentOrg?.id,
    };

    const res = await this.supportTicketService.updateType(request);

    return ApiResponseDto.success(res, 'Type updated sucessfully');
  }

  // @Post('transition-status')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Update Status' })
  // @ApiResponse({ status: 201, description: 'Status updated sucsessfully' })
  // async transitionStatus(
  //   @Body() request: TransitionStatusDto,
  //   @CurrentUser() user: SessionUser,
  // ) {
  //   // Attaching creator userId and orgId to the request
  //   request = {
  //     ...request,
  //     actorUserId: user.userInfo.id,
  //     orgId: user.currentOrg?.id || '',
  //   };

  //   console.log('request: ', request);

  //   const res = await this.supportTicketService.transitionStatus(request);

  //   return ApiResponseDto.success(res, 'Status updated sucessfully');
  // }

  // @Post('update-priority')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Update Priority' })
  // @ApiResponse({ status: 201, description: 'Priority updated sucsessfully' })
  // async updatePriority(
  //   @Body() request: UpdatePriorityDto,
  //   @CurrentUser() user: SessionUser,
  // ) {
  //   // Attaching creator userId and orgId to the request
  //   request = {
  //     ...request,
  //     actorUserId: user.userInfo.id,
  //     orgId: user.currentOrg?.id || '',
  //   };

  //   console.log('request: ', request);

  //   const res = await this.supportTicketService.updatePriority(request);

  //   return ApiResponseDto.success(res, 'Priority updated sucessfully');
  // }

  // @Post('update-type')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Update Type' })
  // @ApiResponse({ status: 201, description: 'Type updated sucsessfully' })
  // async updateType(
  //   @Body() request: UpdateTypeDto,
  //   @CurrentUser() user: SessionUser,
  // ) {
  //   // Attaching creator userId and orgId to the request
  //   request = {
  //     ...request,
  //     actorUserId: user.userInfo.id,
  //     orgId: user.currentOrg?.id || '',
  //   };

  //   console.log('request: ', request);

  //   const res = await this.supportTicketService.updateType(request);

  //   return ApiResponseDto.success(res, 'Priority updated sucessfully');
  // }
}
