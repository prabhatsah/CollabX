import { SessionUser } from '@app/common/interfaces/authenticated-req.interface';

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}
