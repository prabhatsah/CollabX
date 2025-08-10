import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface CurrentUserDto {
  id: string;
  email: string;
  fullName: string;
  orgId?: string;
  role?: string;
}

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserDto, ctx: ExecutionContext): CurrentUserDto | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);
