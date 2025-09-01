import { useSession } from '@/context/session-context';
import { apiFetch } from '@/lib/api';
import { Ticket } from '@/types';
import { useEffect, useState } from 'react';

interface UseListTicketsResult {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}
export function useListTickets(): UseListTicketsResult {
  const { session, isLoading: sessionLoading, refreshSession } = useSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTickets = async () => {
    if (!session) return;
    setLoading(true);
    setError(null);

    try {
      //const res = await apiFetch(`/ticket/list`);
      const res = await apiFetch('/ticket/list', {
        method: 'POST',
        // body: JSON.stringify({ orgId }),
      });

      setTickets(res.data.tickets);
    } catch (error) {
      console.error('useTickets error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading) fetchTickets();
  }, [session, sessionLoading]);

  return {
    tickets,
    loading: sessionLoading || loading,
    error,
    refresh: async () => {
      await refreshSession();
      await fetchTickets();
    },
  };
}
