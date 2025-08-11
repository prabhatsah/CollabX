import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User password (minimum 8 characters)",
    example: "SecurePassword123!",
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @IsNotEmpty()
  password: string;

  // @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  // @IsString()
  // @IsNotEmpty()
  // fullName: string;

  // @ApiProperty({
  //   example: "Acme Corp",
  //   description: "Organziation name of the user",
  // })
  // @IsString()
  // @IsNotEmpty()
  // organizationName: string;
}
