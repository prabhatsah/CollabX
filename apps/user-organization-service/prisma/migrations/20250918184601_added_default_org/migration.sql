-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_defaultOrgId_fkey";

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "defaultOrgId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_defaultOrgId_fkey" FOREIGN KEY ("defaultOrgId") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
