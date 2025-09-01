import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Headers,
  Req,
  Post,
  Res,
  Body,
} from '@nestjs/common';
import { SessionService } from './session.service';
import type { Request, Response } from 'express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { SessionUser } from '@app/common/interfaces/sesion-user.interface';

interface AuthenticatedRequest extends Request {
  cookies: {
    access_token?: string;
    refresh_token?: string;
  };
}

interface SwitchOrgDto {
  orgId: string;
}

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  getMe(@Req() req: AuthenticatedRequest) {
    // getMe(@CurrentUser() req: SessionUser) {
    const authHeader = req.headers['authorization'];
    const cookieToken = req.cookies?.['access_token'];

    const token = authHeader?.replace('Bearer ', '') || cookieToken;

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    return this.sessionService.getSession({ accessToken: token });
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: AuthenticatedRequest,
  ) {
    const cookieToken = req.cookies?.['access_token'];

    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    // Remove session from Redis
    if (cookieToken) {
      try {
        await this.sessionService.clearSessionByToken(cookieToken);
      } catch (err) {
        console.error('Failed to clear session from Redis', err);
      }
    }

    return { success: true, message: 'Logged out successfully' };
  }

  @Post('switch-org')
  async switchOrg(
    @Req() req: AuthenticatedRequest,
    @Body() body: SwitchOrgDto,
  ) {
    const cookieToken = req.cookies?.['access_token'];

    if (!cookieToken) {
      throw new UnauthorizedException('Missing access token');
    }

    return this.sessionService.updateCurrOrgByToken(cookieToken, body.orgId);
  }
}
