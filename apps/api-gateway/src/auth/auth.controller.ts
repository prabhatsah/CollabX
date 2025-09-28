import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { CreateAuthUserRequest, LoginRequest } from '@app/common';
import type { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  // @Post('signup')
  // @HttpCode(HttpStatus.CREATED)
  // createAuthUser(@Body() request: CreateAuthUserRequest) {
  //   return this.authService.createAuthUser(request);
  // }

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async login(
    @Body() request: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(request);

    // Assume result = { accessToken, refreshToken, user }
    res.cookie('access_token', result.data?.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 1, // 1 hour
    });

    res.cookie('refresh_token', result.data?.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return result;
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return this.authService.checkHealth();
  }
}
