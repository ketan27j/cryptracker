-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('TOKEN', 'NFT');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "addressType" "AddressType" NOT NULL DEFAULT 'TOKEN';
