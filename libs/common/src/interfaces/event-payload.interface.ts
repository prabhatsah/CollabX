import { Organization } from './organization.interface';

export interface EventPayload {
  // email: string;
  // fullName?: string;
  // organizations?: Organization[];
  userId: string;
  message: string;
  success: boolean;
}
