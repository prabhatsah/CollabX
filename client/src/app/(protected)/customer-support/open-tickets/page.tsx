'use client';
import { SectionCards } from '@/components/section-cards';

import data from '../data.json';
import { useListTickets } from '@/hooks/support-ticket/useFetchTickets';
import { BoxSpinner } from '@/components/loading-style/box-spinner';
import ErrorPage from '@/components/error-style/error-page';
import { OpenTicketTable } from './components/tickets-table';

const Page = () => {
  const { tickets, loading, error, refresh } = useListTickets();
  console.log("Tickets fetched in open ticket's page.tsx:", tickets);

  if (loading) return <BoxSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div className="flex flex-1 flex-col py-5">
      <div className="@container/main flex flex-1 flex-col gap-2 px-5">
        <div className="flex flex-col gap-6 py-2">
          <SectionCards />
        </div>
        <div className=" py-2">
          <OpenTicketTable data={tickets} onRefresh={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Page;
