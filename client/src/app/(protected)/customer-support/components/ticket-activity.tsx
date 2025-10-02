'use client';

import { UseTicketActivityItemResult } from '@/hooks/support-ticket/useFetchTicketActivity';
import TicketActivityTimeline from './ticket-activity-timeline';
import { BoxSpinner } from '@/components/loading-style/box-spinner';
import ErrorPage from '@/components/error-style/error-page';
import { useEffect } from 'react';

export default function TicketActivity({
  ticketId,
  refreshSignal,
}: {
  ticketId: string;
  refreshSignal?: number;
}) {
  const { ticketActivityItem, loading, error, refresh } =
    UseTicketActivityItemResult(ticketId);
  console.log('ticketActivityItem:', ticketActivityItem);

  // useEffect(() => {
  //   if (refreshSignal !== undefined) {
  //     refresh();
  //   }
  // }, [refreshSignal, refresh]);

  if (loading) return <BoxSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div className="">
      <TicketActivityTimeline items={ticketActivityItem} />
    </div>
  );
}
