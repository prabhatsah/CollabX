import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto {
  @ApiProperty({
    example: "john.doe@example.com",
    description: "Email of the user",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: "Acme Corp",
    description: "Organziation name of the user",
  })
  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @ApiProperty({ example: "password123", description: "Password for the user" })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
