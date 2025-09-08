import { ApiProperty } from '@nestjs/swagger';
import {
  TicketPriority,
  TicketType,
} from 'apps/support-ticket/prisma/generated/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'org_12345', description: 'Organization ID' })
  @IsString()
  @IsNotEmpty()
  orgId: string;

  @ApiProperty({ example: 'org_name', description: 'Organization Name' })
  @IsString()
  @IsNotEmpty()
  orgName: string;

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

  @ApiProperty({
    example: 'User_132343',
    description: 'Creator Id',
  })
  @IsString()
  @IsNotEmpty()
  createdByUserId: string;
}
