import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LockUnlockTicketDto {
  @ApiProperty({
    description: 'true = lock the ticket, false = unlock the ticket',
    example: true,
  })
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  lock!: boolean;
}
