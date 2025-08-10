import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class InviteUserDto {
  @ApiProperty({ example: "newuser@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  @IsString()
  @IsNotEmpty()
  organizationId: string;
}
