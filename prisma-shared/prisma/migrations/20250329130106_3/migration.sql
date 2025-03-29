/*
  Warnings:

  - You are about to drop the column `lastSyncedAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionType` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `targetNFTCollections` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `targetTokens` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "lastSyncedAt",
DROP COLUMN "subscriptionType",
DROP COLUMN "targetNFTCollections",
DROP COLUMN "targetTokens",
ADD COLUMN     "Address" TEXT,
ADD COLUMN     "transactionType" TEXT;
