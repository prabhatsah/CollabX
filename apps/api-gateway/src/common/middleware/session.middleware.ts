import {
  Injectable,
  Logger,
  NestMiddleware,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { SessionService } from '../../session/session.service';
import { SessionUser } from '@app/common/interfaces/sesion-user.interface';
import type { AuthenticatedRequest } from '@app/common/interfaces/authenticated-req.interface';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SessionMiddleware.name);

  constructor(private readonly sessionService: SessionService) {}

  async use(
    @Req() req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    //const authHeader = req.headers['authorization'];
    // const cookieToken = (req as any).cookies?.['access_token'];
    // const token = authHeader?.replace('Bearer ', '') || cookieToken;

    const authHeader = req.headers['authorization'];
    const cookieToken = req.cookies?.['access_token'];

    const token = authHeader?.replace('Bearer ', '') || cookieToken;

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    try {
      // Get session (from Redis or user-org fallback)
      const sessionRes = await this.sessionService.getSession({
        accessToken: token,
      });

      // Attach user session to request (so downstream controllers can use req.user)
      req.user = sessionRes.data as SessionUser;

      this.logger.debug(
        `Session data set by middleware: ${JSON.stringify(req.user)}`,
      );

      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }
}
