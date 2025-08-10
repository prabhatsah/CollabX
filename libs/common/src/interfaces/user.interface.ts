import { UserStatus } from "../enums/user-status.enum";

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
