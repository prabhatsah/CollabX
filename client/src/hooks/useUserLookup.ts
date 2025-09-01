import { useOrgUsers } from './useOrgUsers';

export function useUserlookup() {
  const { users } = useOrgUsers();

  function getUserDetails(userId: string) {
    const userDetails = users.find((user) => user.userId === userId) || null;
    console.log('userDetails:', userDetails);

    return userDetails;
  }

  return { getUserDetails };
}
