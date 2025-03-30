/*
  Warnings:

  - You are about to drop the column `indexBorrowTokens` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `indexNFTBids` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `indexNFTPrices` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `indexTokenPrices` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `subscriptionType` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "indexBorrowTokens",
DROP COLUMN "indexNFTBids",
DROP COLUMN "indexNFTPrices",
DROP COLUMN "indexTokenPrices",
ADD COLUMN     "subscriptionType" TEXT NOT NULL;
