export interface SessionUser {
  authUserId: string;
  email: string;
  fullName: string;
  organizations: {
    id: string;
    name: string;
    role: 'ADMIN' | 'SUPPORT' | 'USER';
  }[];
  currentOrg?: {
    id: string;
    name: string;
    role: 'ADMIN' | 'SUPPORT' | 'USER';
  };
}
