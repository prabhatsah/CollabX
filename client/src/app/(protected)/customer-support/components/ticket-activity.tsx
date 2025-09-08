'use client';

import TicketActivityTimeline, {
  TicketActivityItem,
} from './ticket-activity-timeline';

export default function TicketActivity() {
  const demoItems: TicketActivityItem[] = [
    {
      id: '1',
      type: 'created',
      actor: 'John Doe',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      meta: { createdBy: 'John Doe' },
    },
    {
      id: '2',
      type: 'assigned',
      actor: 'Admin Bob',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
      meta: { assignee: 'Jane Smith' },
    },
    {
      id: '3',
      type: 'status_changed',
      actor: 'Jane Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      meta: { from: 'Open', to: 'In Progress' },
    },
    {
      id: '4',
      type: 'priority_changed',
      actor: 'Jane Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      meta: { from: 'Medium', to: 'High' },
    },
    {
      id: '5',
      type: 'comment_added',
      actor: 'John Doe',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
      meta: {
        body:
          "I've added more context about the steps to reproduce the bug. " +
          "It seems to occur after clicking the 'Save' button twice in quick succession.\n\n" +
          'Environment: macOS 14.5, Chrome 127.',
      },
    },
  ];

  return (
    <div className="">
      <TicketActivityTimeline items={demoItems} />
    </div>
  );
}
