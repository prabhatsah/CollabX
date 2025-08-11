import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { MembershipRole } from "@app/common";

export class AddMemberDto {
  @IsEmail()
  email: string;

  @IsString()
  organizationId: string;

  @IsEnum(MembershipRole)
  role: MembershipRole;

  @IsOptional()
  permissions?: any;
}
