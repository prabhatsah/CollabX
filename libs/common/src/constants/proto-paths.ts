import { join } from 'path';

export const PROTO_PATHS = {
  AUTH: join(__dirname, '../../../../proto/auth.proto'),
  USER_ORG: join(__dirname, '../../../../proto/user-org.proto'),
  AUDIT: join(__dirname, '../../../../proto/audit.proto'),
  SUPPORT_TICKET: join(__dirname, '../../../../proto/support-ticket.proto'),
};
