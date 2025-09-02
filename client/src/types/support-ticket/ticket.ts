export type TicketStatus =
  'OPEN | IN_PROGRESS | ON_HOLD | CANCELLED | RESOLVED | CLOSED';

export type TicketPriority = 'LOW | MEDIUM | HIGH';

export type SLAStatus = 'ON_TRACK' | 'AT_RISK' | 'BREACHED';

export interface Ticket {
  id: string;
  orgId: string;
  title: string;
  description: string;
  createdByUserId: string;
  assigneeUserId: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  slaDeadline?: string;
  slaStatus?: SLAStatus;
}

export interface TicketListResponse {
  tickets: Ticket[];
  nextCursor?: string;
}

export interface CreateTicketRequest {
  title: string;
  priority: TicketPriority;
  description: string;
}

export interface TicketMetrics {
  totalOpen: number;
  totalClosed30d: number;
  avgResolutionTime: number;
  backlogAging: number;
}

export interface OrgUser {
  id: string;
  fullName: string;
  email: string;
}
