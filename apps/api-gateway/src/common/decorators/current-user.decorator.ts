import { AuthenticatedRequest } from '@app/common/interfaces/authenticated-req.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user; // comes from middleware
  },
);
