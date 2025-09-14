import { TicketActivityItem } from '@/app/(protected)/customer-support/components/ticket-activity-timeline';
import { useSession } from '@/context/session-context';
import { apiFetch } from '@/lib/api';
import { Ticket } from '@/types';
import { debug } from 'console';
import { useEffect, useState } from 'react';

interface UseTicketActivityItemResult {
  ticketActivityItem: TicketActivityItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}
interface TicketActivityApiResponse {
  success: boolean;
  message: string;
  data: {
    activities: TicketActivityItem[];
  };
}

export function UseTicketActivityItemResult(
  ticketId: string,
): UseTicketActivityItemResult {
  const { session, isLoading: sessionLoading, refreshSession } = useSession();
  const [ticketActivityItem, setTicketActivityItem] = useState<
    TicketActivityItem[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTicketActivityItem = async () => {
    if (!session) return;
    setLoading(true);
    setError(null);

    try {
      const res: TicketActivityApiResponse = await apiFetch(
        `/ticket/${ticketId}/ticketActivityItem`,
      );

      setTicketActivityItem(res.data.activities);
    } catch (error) {
      console.error('UseTicketActivityResult error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading) fetchTicketActivityItem();
  }, [session, sessionLoading]);

  return {
    ticketActivityItem,
    loading: sessionLoading || loading,
    error,
    refresh: async () => {
      await refreshSession();
      await fetchTicketActivityItem();
    },
  };
}
