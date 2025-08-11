import { MembershipRole } from "../enums/membership-role.enum";

export interface IMembership {
  id: string;
  userId: string;
  organizationId: string;
  role: MembershipRole;
  joinedAt: Date;
  leftAt?: Date;
  permissions?: any;
  createdAt: Date;
  updatedAt: Date;
}
