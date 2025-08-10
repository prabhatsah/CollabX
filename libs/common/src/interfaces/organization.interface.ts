export interface IOrganization {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
