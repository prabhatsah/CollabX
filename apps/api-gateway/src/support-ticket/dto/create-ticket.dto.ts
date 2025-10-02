import { ApiProperty } from '@nestjs/swagger';
import {
  TicketPriority,
  TicketType,
} from 'apps/support-ticket/prisma/generated/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
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
}

// export class CreateTicketServiceDto {
//   @ApiProperty({ example: 'Login bug', description: 'Ticket title' })
//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @ApiProperty({
//     example: 'User cannot log in with valid credentials',
//     description: 'Ticket description',
//   })
//   @IsString()
//   @IsNotEmpty()
//   description: string;

//   @ApiProperty({ enum: TicketPriority, example: TicketPriority.HIGH })
//   @IsEnum(TicketPriority)
//   priority: TicketPriority;

//   @ApiProperty({ enum: TicketType, example: TicketType.INCIDENT })
//   @IsEnum(TicketType)
//   type: TicketType;

//   @ApiProperty({
//     example: 'cmg3cpvu40002u2fk9qq0y3y7',
//     description: 'Created by user id',
//   })
//   @IsString()
//   @IsNotEmpty()
//   createdByUserId: string;

//   @ApiProperty({
//     example: 'cmg3cpvu40002u2fk9qq0y3y7',
//     description: 'Created by user Id',
//   })
//   @IsString()
//   @IsNotEmpty()
//   userName: string;

//   @ApiProperty({
//     example: 'cmg3cpvu40002u2fk9qq0y3y7',
//     description: 'Organization Id',
//   })
//   @IsString()
//   @IsNotEmpty()
//   orgId: string;

//   @ApiProperty({
//     example: 'Yahoo Inc.',
//     description: 'Organization name',
//   })
//   @IsString()
//   @IsNotEmpty()
//   orgName: string;

//   @ApiProperty({
//     example: 'abc@gmail.com',
//     description: 'User email',
//   })
//   @IsEmail()
//   @IsNotEmpty()
//   userEmail: string;
// }
