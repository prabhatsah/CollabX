-- CreateTable
CREATE TABLE "public"."TicketCounter" (
    "id" SERIAL NOT NULL,
    "orgId" TEXT NOT NULL,
    "yearMonth" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TicketCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TicketCounter_orgId_yearMonth_key" ON "public"."TicketCounter"("orgId", "yearMonth");
