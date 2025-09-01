import { useSession } from '@/context/session-context';
import { apiFetch } from '@/lib/api';
import { User, UsersInOrgResponse } from '@/types';
import { useEffect, useState } from 'react';

interface UseOrgUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useOrgUsers(): UseOrgUsersResult {
  const { session, isLoading: sessionLoading, refreshSession } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!session) return;
    setLoading(true);
    setError(null);

    try {
      const res: UsersInOrgResponse = await apiFetch(
        `/organizations/${session.currentOrg?.id}/users`,
      );

      console.log('Users:', res);

      setUsers(res.users);
    } catch (error) {
      console.error('useOrgUsers error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading) {
      fetchUsers();
    }
  }, [session, sessionLoading]);

  return {
    users,
    loading: sessionLoading || loading,
    error,
    refresh: async () => {
      await refreshSession();
      await fetchUsers();
    },
  };
}
