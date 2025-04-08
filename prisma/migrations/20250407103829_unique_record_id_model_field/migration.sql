/*
  Warnings:

  - A unique constraint covering the columns `[recordId,model,field]` on the table `TestVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestVariant_recordId_model_field_key" ON "TestVariant"("recordId", "model", "field");
