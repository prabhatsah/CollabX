'use client';
import { SectionCards } from '@/components/section-cards';
import { OpenTicketTable } from './components/data-table-modifiled';

import data from '../data.json';
import { useListTickets } from '@/hooks/support-ticket/useOpenTickets';
import { BoxSpinner } from '@/components/loading-style/box-spinner';
import ErrorPage from '@/components/error-style/error-page';

const Page = () => {
  const { tickets, loading, error, refresh } = useListTickets();

  if (loading) return <BoxSpinner />;
  if (error) return <ErrorPage />;
  console.log('tickets:', tickets);

  return (
    <div className="flex flex-1 flex-col py-5">
      <div className="@container/main flex flex-1 flex-col gap-2 px-5">
        <div className="flex flex-col gap-6 py-2">
          <SectionCards />
        </div>
        <div className=" py-2">
          {/* <OpenTicketTable data={data} /> */}
          <OpenTicketTable data={tickets} onRefresh={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Page;
