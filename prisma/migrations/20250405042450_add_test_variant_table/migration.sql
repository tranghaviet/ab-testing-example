-- CreateTable
CREATE TABLE "TestVariant" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "TestVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestVariant_recordId_key" ON "TestVariant"("recordId");

-- CreateIndex
CREATE INDEX "TestVariant_recordId_idx" ON "TestVariant"("recordId");
