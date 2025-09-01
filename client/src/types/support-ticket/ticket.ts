import z from 'zod';

export type TicketStatus =
  'OPEN | IN_PROGRESS | ON_HOLD | CANCELLED | RESOLVED | CLOSED';

export type TicketPriority = 'LOW | MEDIUM | HIGH';

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
}

// export const ticketSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   type: z.string(),
//   status: z.string(),
//   description: z.string(),
//   createdByUserId: z.string(),
//   orgId: z.string(),
//   assignedTo: z.string(),
//   createdAt: z.string().transform((val) => new Date(val)),
//   updatedAt: z.string().transform((val) => new Date(val)),
// });

// export type Ticket = z.infer<typeof ticketSchema>;
