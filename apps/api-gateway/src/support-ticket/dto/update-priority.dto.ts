// list-tickets.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePriorityDto {
  @ApiProperty({ example: 'High', description: 'New priority' })
  @IsEnum(['HIGH', 'MEDIUM', 'LOW'], {
    message: 'Priority must be one of HIGH, MEDIUM, LOW',
  })
  @IsString()
  @IsNotEmpty()
  newPriority: string;
}
