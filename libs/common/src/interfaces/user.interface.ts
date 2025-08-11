import { MembershipRole } from "../enums/membership-role.enum";
import { UserStatus } from "../enums/user-status.enum";

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  profileImage?: string;
  status: UserStatus;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserOrganization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  role: MembershipRole;
  joinedAt: Date;
  isActive: boolean;
}

export interface IUserWithOrganizations extends IUser {
  organizations: IUserOrganization[];
}
