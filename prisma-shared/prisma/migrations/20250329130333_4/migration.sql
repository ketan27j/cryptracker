/*
  Warnings:

  - You are about to drop the column `Address` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "Address",
ADD COLUMN     "address" TEXT;
