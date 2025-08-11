import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({
    description: "Password reset token",
    example: "abc123def456...",
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: "New password (minimum 8 characters)",
    example: "NewSecurePassword123!",
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @IsNotEmpty()
  newPassword: string;
}
