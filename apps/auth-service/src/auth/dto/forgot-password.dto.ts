import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty({
    description: "Email address to send reset instructions",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsNotEmpty()
  email: string;
}
