import { useSession } from '@/context/session-context';

export function useOrgLookup() {
  const { session } = useSession();

  function getOrgDetails(orgId: string) {
    const orgDetails =
      session?.organizations.find((org) => org.id === orgId) || null;

    return orgDetails;
  }

  return { getOrgDetails };
}
