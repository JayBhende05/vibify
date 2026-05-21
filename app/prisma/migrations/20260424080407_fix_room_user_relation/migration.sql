/*
  Warnings:

  - You are about to drop the column `userId` on the `Stream` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId,extractedId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addedById` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Provider" ADD VALUE 'Credentials';

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_userId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_streamId_fkey";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "userId",
ADD COLUMN     "addedById" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "bThumbnail" DROP NOT NULL,
ALTER COLUMN "bThumbnail" DROP DEFAULT,
ALTER COLUMN "sThumbnail" DROP NOT NULL,
ALTER COLUMN "sThumbnail" DROP DEFAULT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "title" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Upvote" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stream_roomId_extractedId_key" ON "Stream"("roomId", "extractedId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
