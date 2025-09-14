// list-tickets.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypeDto {
  @ApiProperty({ example: 'Bug', description: 'New type' })
  @IsEnum(['BUG', 'FEATURE', 'INCIDENT'], {
    message: 'Type must be one of BUG, FEATURE, INCIDENT',
  })
  @IsString()
  @IsNotEmpty()
  newType: string;
}
