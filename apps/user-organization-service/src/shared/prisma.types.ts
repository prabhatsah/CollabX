import { PrismaClient } from 'apps/user-organization-service/prisma/generated/client';

// Scoped transaction type
export type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;
