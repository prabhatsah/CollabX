// list-tickets.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class TransitionStatusDto {
  @ApiProperty({ example: 'On Hold', description: 'New status' })
  @IsEnum(
    ['OPEN', 'IN_PROGRESS', 'ON_HOLD', 'CANCELLED', 'RESOLVED', 'CLOSED'],
    {
      message:
        'Status must be one of OPEN, IN_PROGRESS, ON_HOLD, CANCELLED, RESOLVED, CLOSED',
    },
  )
  @IsString()
  @IsNotEmpty()
  newStatus: string;
}
