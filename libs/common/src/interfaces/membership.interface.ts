import { MembershipRole } from "../enums/membership-role.enum";

export interface IMembership {
  id: string;
  userId: string;
  organizationId: string;
  role: MembershipRole;
  active: boolean;
  invitedBy?: string;
  joinedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
