-- CreateEnum
CREATE TYPE "IndexingStatus" AS ENUM ('PENDING', 'ACTIVE', 'PAUSED', 'ERROR');

-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Github');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "googleId" TEXT,
    "name" TEXT,
    "postgresCredentials" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndexingConfig" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "indexNFTBids" BOOLEAN NOT NULL DEFAULT false,
    "indexNFTPrices" BOOLEAN NOT NULL DEFAULT false,
    "indexBorrowTokens" BOOLEAN NOT NULL DEFAULT false,
    "indexTokenPrices" BOOLEAN NOT NULL DEFAULT false,
    "targetNFTCollections" TEXT[],
    "targetTokens" TEXT[],
    "webhookId" TEXT,
    "webhookUrl" TEXT,
    "status" "IndexingStatus" NOT NULL DEFAULT 'PENDING',
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndexingConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenPrice" (
    "id" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "indexingConfigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "IndexingConfig" ADD CONSTRAINT "IndexingConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenPrice" ADD CONSTRAINT "TokenPrice_indexingConfigId_fkey" FOREIGN KEY ("indexingConfigId") REFERENCES "IndexingConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
