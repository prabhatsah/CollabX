import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CompleteSignupDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupUserOrgDto {
  @IsNotEmpty()
  @IsString()
  authUserId: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  organizationName: string;
}
