export const KAFKA_TOPICS = {
  // Auth Events
  USER_SIGNUP: "auth.user.signup",
  USER_LOGIN: "auth.user.login",
  USER_INVITE_SENT: "auth.user.invite.sent",

  //User Events
  USER_CREATED: "user.created",
  USER_UPDATED: "user.updated",
  USER_DELETED: "user.deleted",

  // Organization Events
  ORGANIZATION_CREATED: "organization.created",
  ORGANIZATION_UPDATED: "organization.updated",
  ORGANIZATION_DELETED: "organization.deleted",

  //MemberShip Events
  MEMBERSHIP_CREATED: "membership.created",
  MEMBERSHIP_UPDATED: "membership.updated",
  MEMBERSHIP_DELETED: "membership.deleted",
} as const;
