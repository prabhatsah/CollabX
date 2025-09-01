/*
  Warnings:

  - The values [ASSIGNED] on the enum `TicketStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."TicketStatus_new" AS ENUM ('OPEN', 'IN_PROGRESS', 'ON_HOLD', 'CANCELLED', 'RESOLVED', 'CLOSED');
ALTER TABLE "public"."tickets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."tickets" ALTER COLUMN "status" TYPE "public"."TicketStatus_new" USING ("status"::text::"public"."TicketStatus_new");
ALTER TYPE "public"."TicketStatus" RENAME TO "TicketStatus_old";
ALTER TYPE "public"."TicketStatus_new" RENAME TO "TicketStatus";
DROP TYPE "public"."TicketStatus_old";
ALTER TABLE "public"."tickets" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;
