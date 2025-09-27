import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InviteUserDto {
  @ApiProperty({ example: 'Organization Id', description: 'Organization Id' })
  @IsString()
  @IsNotEmpty()
  orgId: string;

  @ApiProperty({
    example: 'Invitee Email',
    description: 'Invitee Email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'User role', description: 'User role' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
