import { ApiProperty } from '@nestjs/swagger';
import { TicketPriority } from 'apps/support-ticket/prisma/generated/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'org_12345', description: 'Organization ID' })
  @IsString()
  @IsNotEmpty()
  orgId: string;

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

  @ApiProperty({
    example: 'User_132343',
    description: 'Creator Id',
  })
  @IsString()
  @IsNotEmpty()
  createdByUserId: string;
}
