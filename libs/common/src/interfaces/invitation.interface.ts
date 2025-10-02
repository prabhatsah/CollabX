export interface InvitationPayload {
  email: string;
  organizationId: string;
  organizationName: string;
  role: string;
  invitedById: string;
  token: string;
  invitedAt: string;
  expiresAt: string;
}

export interface InvitationAcceptPayload {
  email: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  role: string;
  invitedById: string;
  token: string;
  acceptedAt: string;
  expiresAt: string;
}
