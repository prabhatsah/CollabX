import { ApiProperty } from '@nestjs/swagger';
import {
  TicketPriority,
  TicketType,
} from 'apps/support-ticket/prisma/generated/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'Login bug', description: 'Ticket title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'User cannot log in with valid credentials',
    description: 'Ticket description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TicketPriority, example: TicketPriority.HIGH })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @ApiProperty({ enum: TicketType, example: TicketType.INCIDENT })
  @IsEnum(TicketType)
  type: TicketType;
}
