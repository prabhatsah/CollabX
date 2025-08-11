import { IsOptional, IsString, IsEnum, IsBoolean } from "class-validator";
import { UserStatus } from "@app/common";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;
}
