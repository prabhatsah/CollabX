import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { SessionUser } from '@app/common/interfaces/sesion-user.interface';

@Injectable()
export class OrgRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as SessionUser;

    if (!user) {
      throw new ForbiddenException('No authenticated user found!');
    }

    const orgId = req.params['organizationId']; // param from route

    // Only check orgId if it exists in route
    if (orgId) {
      if (!user.currentOrg || user.currentOrg.id !== orgId) {
        throw new ForbiddenException('Access denied: Wrong organization');
      }
    }

    const userRole = user.currentOrg.role?.toUpperCase();
    const required = requiredRoles.map((r) => r.toUpperCase());
    console.log('userRole: ', userRole, ', required: ', required);

    if (!required.includes(userRole)) {
      throw new ForbiddenException(
        `You are not authorised. Only ${required.join(', ')} can assign.`,
      );
    }

    return true;
  }
}
