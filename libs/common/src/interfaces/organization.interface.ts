import { Role } from '../enums';

export interface Organization {
  id: string;
  name: string;
  role: Role;
}
