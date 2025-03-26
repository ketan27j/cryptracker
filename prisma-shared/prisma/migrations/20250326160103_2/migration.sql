-- CreateTable
CREATE TABLE "TokenPrice" (
    "id" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "indexingConfigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TokenPrice" ADD CONSTRAINT "TokenPrice_indexingConfigId_fkey" FOREIGN KEY ("indexingConfigId") REFERENCES "IndexingConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
