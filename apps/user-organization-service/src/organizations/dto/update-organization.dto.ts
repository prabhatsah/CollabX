import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  Min,
  IsEnum,
} from "class-validator";
import { OrganizationPlan } from "@app/common";

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  settings?: any;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsEnum(OrganizationPlan)
  plan?: OrganizationPlan;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxMembers?: number;
}
