import { useSession } from '@/context/session-context';
import { apiFetch } from '@/lib/api';
import { User, UsersInOrgResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function fetchUsers(orgId: string): Promise<User[]> {
  const res: UsersInOrgResponse = await apiFetch(
    `/organizations/${orgId}/users`,
  );
  return res.users;
}

export function useUsers() {
  const { session, isLoading: sessionLoading } = useSession();
  const orgId: string = session?.currentOrg?.id;

  const {
    data: users = [],
    error,
    isLoading,
    refetch,
  } = useQuery<User[], Error>({
    queryKey: ['users', orgId], // cache key
    queryFn: () => fetchUsers(orgId!),
    enabled: !!orgId, // only fetch if orgId exists
    staleTime: 1000 * 60 * 5, // 5 min "fresh"
    cacheTime: 1000 * 60 * 30, // 30 min in memory
  });

  const userMapById = Object.fromEntries(
    users.map((user: User) => [user.userId, user]),
  );

  const getUserById = (userId: string) => userMapById[userId] || null;

  return {
    users,
    userMapById,
    getUserById,
    loading: sessionLoading || isLoading,
    error: error?.message || null,
    refetch,
  };
}
