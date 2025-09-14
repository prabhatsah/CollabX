'use client';

import { UseTicketActivityItemResult } from '@/hooks/support-ticket/useFetchTicketActivity';
import TicketActivityTimeline from './ticket-activity-timeline';
import { BoxSpinner } from '@/components/loading-style/box-spinner';
import ErrorPage from '@/components/error-style/error-page';

export default function TicketActivity({ ticketId }: { ticketId: string }) {
  const { ticketActivityItem, loading, error, refresh } =
    UseTicketActivityItemResult(ticketId);
  console.log('ticketActivityItem:', ticketActivityItem);

  if (loading) return <BoxSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div className="">
      <TicketActivityTimeline items={ticketActivityItem} />
    </div>
  );
}
