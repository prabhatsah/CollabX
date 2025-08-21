export type Role = 'ADMIN' | 'SUPPORT' | 'USER';

export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface UsersInOrgResponse {
  users: User[];
}
