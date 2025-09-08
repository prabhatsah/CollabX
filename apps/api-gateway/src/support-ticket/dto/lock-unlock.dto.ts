import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LockUnlockTicketDto {
  @ApiProperty({
    description: 'Ticket id to lock/unlock',
    example: '4a1b2c3d-4e5f-6789-abcd-0123456789ab',
  })
  @IsNotEmpty()
  @IsString()
  ticketId!: string;

  @ApiProperty({
    description: 'true = lock the ticket, false = unlock the ticket',
    example: true,
  })
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  lock!: boolean;
}
