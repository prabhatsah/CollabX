import { Organization } from './organization.interface';

export interface EventPayload {
  email: string;
  message: string;
  success: boolean;
  fullName?: string;
  organizations?: Organization[];
}
