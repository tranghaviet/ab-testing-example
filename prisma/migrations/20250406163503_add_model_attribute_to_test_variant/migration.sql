/*
  Warnings:

  - Added the required column `model` to the `TestVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestVariant" ADD COLUMN     "model" TEXT NOT NULL;
