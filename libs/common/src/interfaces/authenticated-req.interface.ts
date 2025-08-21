import { Request } from 'express';
import { SessionUser } from './sesion-user.interface';

export interface AuthenticatedRequest extends Request {
  user: SessionUser;
}
