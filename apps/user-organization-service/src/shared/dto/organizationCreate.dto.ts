import { IsNotEmpty, IsString } from 'class-validator';

export class OrganizationCreateDto {
  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  organizationName: string;
}
