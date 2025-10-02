'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { apiFetch } from '@/lib/api';
import { Ticket } from '@/types';
import { BoxSpinner } from '@/components/loading-style/box-spinner';
import ErrorPage from '@/components/error-style/error-page';
import TicketDashboard from '../../components/TicketDashboard';

export default function TicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch the ticket data
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch(`/ticket/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!mounted) return;
        setTicket(res.data.ticket as Ticket);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load ticket');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  // handle inline updates from the dashboard
  const handleUpdate = (updated: Ticket) => {
    setTicket(updated);
  };

  if (loading) return <BoxSpinner />;
  if (error || !ticket) return <ErrorPage />;

  return (
    <div className="w-full min-h-screen bg-background">
      {/* If you want a back button */}
      <div className="p-4">
        <button
          className="text-sm underline"
          onClick={() => router.back()}
          aria-label="Back"
        >
          ← Back
        </button>
      </div>
      <h1>Hello</h1>
      <TicketDashboard ticket={ticket} onUpdate={handleUpdate} />
    </div>
  );
}
