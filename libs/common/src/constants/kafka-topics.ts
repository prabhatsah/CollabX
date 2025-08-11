export const KAFKA_TOPICS = {
  // Auth Service Events
  USER_LOGIN: "auth.user.login",
  USER_SIGNUP: "auth.user.signup",
  PASSWORD_RESET_REQUESTED: "auth.password.reset.requested",
  PASSWORD_RESET_COMPLETED: "auth.password.reset.completed",
  EMAIL_VERIFIED: "auth.email.verified",
  VERIFICATION_RESENT: "auth.verification.resent",

  // User events
  USER_REGISTERED: "user.registered",
  USER_UPDATED: "user.updated",
  USER_DEACTIVATED: "user.deactivated",

  // Organization events
  ORGANIZATION_CREATED: "organization.created",
  ORGANIZATION_UPDATED: "organization.updated",
  ORGANIZATION_DEACTIVATED: "organization.deactivated",

  // Membership events
  MEMBER_ADDED: "organization.member.added",
  MEMBER_REMOVED: "organization.member.removed",
  MEMBER_ROLE_CHANGED: "organization.member.role.changed",

  // Invitation events
  INVITATION_SENT: "organization.invitation.sent",
  INVITATION_ACCEPTED: "organization.invitation.accepted",
  INVITATION_REJECTED: "organization.invitation.rejected",

  // Audit events
  AUDIT_LOG_CREATED: "audit.log.created",

  // Notification Events
  SEND_WELCOME_EMAIL: "notification.email.welcome",
  SEND_VERIFICATION_EMAIL: "notification.email.verification",
  SEND_PASSWORD_RESET_EMAIL: "notification.email.password-reset",
  SEND_INVITATION_EMAIL: "notification.email.invitation",
  EMAIL_SENT_SUCCESS: "notification.email.sent.success",
  EMAIL_SENT_FAILED: "notification.email.sent.failed",
} as const;

export type KafkaTopics = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS];
