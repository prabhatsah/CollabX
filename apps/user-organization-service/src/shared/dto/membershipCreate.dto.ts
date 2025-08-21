import { IsNotEmpty, IsString } from 'class-validator';

export class MembershipCreateRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  organizationId: string;
}
