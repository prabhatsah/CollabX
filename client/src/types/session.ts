import { Role } from './users';

export interface SessionUser {
  id: string;
  authUserId: string;
  fullName: string;
  email: string;
}

export interface OrgSummary {
  id: string;
  name: string;
  role: Role;
}

export interface SessionData {
  userInfo: SessionUser;
  currentOrg: OrgSummary | null; // null if not selected yet
  organizations: OrgSummary[];
}
