import { useSession } from '@/context/session-context';
import { apiFetch } from '@/lib/api';
import { AuditLog, AuditLogResponse } from '@/types';
import { useEffect, useState } from 'react';

interface UseAuditLogsResult {
  auditLogs: AuditLog[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useAuditlogs(): UseAuditLogsResult {
  const { session, isLoading: sessionLoading, refreshSession } = useSession();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditLogs = async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    debugger;

    try {
      const res: AuditLogResponse = await apiFetch(`/audit/logs`);

      console.log('AuditLogs:', res);

      setAuditLogs(res.data.auditLogs);
    } catch (error) {
      console.error('useAuditlogs error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading) {
      fetchAuditLogs();
    }
  }, [session, sessionLoading]);

  return {
    auditLogs,
    loading: sessionLoading || loading,
    error,
    refresh: async () => {
      await refreshSession();
      await fetchAuditLogs();
    },
  };
}
