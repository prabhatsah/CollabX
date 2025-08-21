import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  ChangePasswordRequest,
  CreateAuthUserRequest,
  HealthCheckRequest,
  HealthCheckResponse,
  LoginRequest,
  VerifyTokenRequest,
} from '@app/common/proto/auth';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  createAuthUser(createAuthUserRequest: CreateAuthUserRequest) {
    return this.authService.signup(createAuthUserRequest);
  }

  login(request: LoginRequest) {
    return this.authService.login(request);
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) {
    return {
      success: true,
    };
  }

  verifyToken(request: VerifyTokenRequest) {
    return this.authService.verifyToken(request);
  }

  checkHealth(request: HealthCheckRequest): HealthCheckResponse {
    return this.authService.checkHealth();
  }
}
