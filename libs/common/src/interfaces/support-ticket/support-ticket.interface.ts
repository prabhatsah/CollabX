export interface TicketCreateEventPayload {
  ticketNo: string;
  userName: string;
  email: string;
  organizationName: string;
  title: string;
  priority: string;
  type: string;
  createdAt: string;
  status: string;
  message: string;
  success: boolean;
}
