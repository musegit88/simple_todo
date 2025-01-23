/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "planned" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_userId_key" ON "Tasks"("userId");
