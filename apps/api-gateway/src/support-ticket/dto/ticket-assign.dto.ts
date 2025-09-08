// list-tickets.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignTicketDto {
  // @ApiProperty({ example: 'crgr56778543434', description: 'Ticket ID' })
  // @IsString()
  // @IsNotEmpty()
  // ticketId: string;

  // @ApiProperty({ example: 'cji56778543434', description: 'Organization ID' })
  // @IsString()
  // @IsNotEmpty()
  // orgId: string;

  @ApiProperty({ example: 'cji56778543777', description: 'Assignee User ID' })
  @IsString()
  @IsNotEmpty()
  assigneeUserId: string;

  // @ApiProperty({ example: 'cjir54545454', description: 'Actor User ID' })
  // @IsString()
  // @IsNotEmpty()
  // actorUserId: string;
}
