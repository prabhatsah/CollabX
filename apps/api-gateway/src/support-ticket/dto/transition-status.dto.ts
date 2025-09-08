// list-tickets.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class TransitionStatusDto {
  @ApiProperty({ example: 'On Hold', description: 'New status' })
  @IsEnum(
    ['OPEN', 'IN_PROGRESS', 'ON_HOLD', 'CANCELLED', 'RESOLVED', 'CLOSED'],
    {
      message:
        'Status must be one of OPEN, IN_PROGRESS, ON_HOLD, CANCELLED,RESOLVED,CLOSED, Closed',
    },
  )
  @IsString()
  @IsNotEmpty()
  newStatus: string;

  @ApiProperty({
    example: 'This ticket needs to be put on hold',
    description: 'Reason for status change',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
