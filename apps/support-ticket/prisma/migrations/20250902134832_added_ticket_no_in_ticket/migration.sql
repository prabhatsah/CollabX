/*
  Warnings:

  - A unique constraint covering the columns `[ticketNo]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticketNo` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tickets" ADD COLUMN     "ticketNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticketNo_key" ON "public"."tickets"("ticketNo");
