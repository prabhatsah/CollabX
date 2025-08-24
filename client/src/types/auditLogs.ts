interface Payload {
  email: string;
  message: string;
  event: string;
  timestamp: string;
  success: boolean;
}

export interface AuditLog {
  id: string;
  eventType: string;
  payload: Payload;
  userId: string;
  orgId: string;
  ip: string;
  userAgent?: string;
  createdAt: string;
}

interface AuditLogs {
  auditLogs: AuditLog[];
}

export interface AuditLogResponse {
  success: string;
  message: string;
  data: AuditLogs;
}
