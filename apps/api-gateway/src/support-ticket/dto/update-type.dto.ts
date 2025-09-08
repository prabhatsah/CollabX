// list-tickets.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypeDto {
  @ApiProperty({ example: 'crgr56778543434', description: 'Ticket ID' })
  @IsString()
  @IsNotEmpty()
  ticketId: string;

  @ApiProperty({ example: 'Bug', description: 'New type' })
  @IsEnum(['BUG', 'FEATURE', 'INCIDENT'], {
    message: 'Type must be one of BUG, FEATURE, INCIDENT',
  })
  @IsString()
  @IsNotEmpty()
  newType: string;

  @ApiProperty({
    example: 'This ticket is of Incident type',
    description: 'Reason for type change',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
