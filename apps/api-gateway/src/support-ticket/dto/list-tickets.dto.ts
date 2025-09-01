// list-tickets.dto.ts
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';
import {
  TicketPriority,
  TicketStatus,
} from 'apps/support-ticket/prisma/generated/client';

export class ListTicketsDto {
  @IsUUID()
  orgId: string;

  @IsOptional()
  @IsArray()
  @IsEnum(TicketStatus, { each: true })
  status?: TicketStatus[];

  @IsOptional()
  @IsArray()
  @IsEnum(TicketPriority, { each: true })
  priority?: TicketPriority[];

  @IsOptional()
  @IsUUID()
  assigneeUserId?: string;

  @IsUUID()
  createdByUserId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  cursor?: string;
}
