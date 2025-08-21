import { Injectable, Logger } from '@nestjs/common';
import type { CreateAuthUserRequest } from '@app/common/proto/auth';
import { CompleteSignupDto, SignupUserOrgDto } from './dto/sign.dto';
import { AuthService } from '../auth/auth.service';
import { UserOrgService } from '../user-org/user-org.service';
import { ApiResponseDto } from '@app/common/dto/response.dto';

@Injectable()
export class SignupService {
  private readonly logger = new Logger(SignupService.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userOrgService: UserOrgService,
  ) {}

  async signup(dto: CompleteSignupDto) {
    try {
      //Create user in Auth service
      const argAuth: CreateAuthUserRequest = {
        email: dto.email,
        password: dto.password,
      };
      this.logger.log('Signup workflow initiated');

      const res = await this.authService.createAuthUser(argAuth);

      if (!res.success) {
        this.logger.error(
          `Error occured while creating auth user: ${res.message}`,
        );
        return {
          success: res.success,
          message: res.message,
        };
      }
      this.logger.log('Step 1/2: Created Auth User...', res.message);

      //Create user + org in UserOrg service
      const argUserOrg: SignupUserOrgDto = {
        authUserId: res.data!.authUserId,
        organizationName: dto.organizationName,
        fullName: dto.fullName,
        email: dto.email,
      };
      const userOrgRes = await this.userOrgService.createUserAndOrg(argUserOrg);

      if (!userOrgRes.success) {
        this.logger.error(
          `Error occured while creating user and organization: ${userOrgRes.message}`,
        );
        return {
          success: userOrgRes.success,
          message: userOrgRes.message,
        };
      }

      this.logger.log('Step 2/2: Created User + Organization...');

      return ApiResponseDto.success(
        {
          authUserId: res.data?.authUserId,
          organizationId: userOrgRes.data?.organizationId,
          membershipId: userOrgRes.data?.membershipId,
        },
        'Signup completed.',
      );
    } catch (error) {
      this.logger.error('Signup flow failed, starting rollback...');

      throw error;
    }
  }
}
