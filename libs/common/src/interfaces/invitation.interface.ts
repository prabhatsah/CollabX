import { InvitationStatus } from "../enums/invitation-status.enum";
import { MembershipRole } from "../enums/membership-role.enum";

export interface IInvitation {
  id: string;
  email: string;
  role: MembershipRole;
  status: InvitationStatus;
  token: string;
  organizationId: string;
  invitedById?: string;
  expiresAt: Date;
  sentAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
