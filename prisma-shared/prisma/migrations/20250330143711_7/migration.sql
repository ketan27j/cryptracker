-- CreateTable
CREATE TABLE "UserPostgresDatabase" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "databaseName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPostgresDatabase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPostgresDatabase" ADD CONSTRAINT "UserPostgresDatabase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
