import { IsOptional, IsEnum } from "class-validator";
import { MembershipRole, MembershipStatus } from "@app/common";

export class UpdateMembershipDto {
  @IsOptional()
  @IsEnum(MembershipRole)
  role?: MembershipRole;

  @IsOptional()
  @IsEnum(MembershipStatus)
  status?: MembershipStatus;

  @IsOptional()
  permissions?: any;
}
