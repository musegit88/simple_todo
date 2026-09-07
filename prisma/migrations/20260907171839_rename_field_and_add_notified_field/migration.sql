/*
  Warnings:

  - You are about to drop the column `Stringendpoint` on the `PushSubscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[endpoint]` on the table `PushSubscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endpoint` to the `PushSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PushSubscription_Stringendpoint_key";

-- AlterTable
ALTER TABLE "PushSubscription" DROP COLUMN "Stringendpoint",
ADD COLUMN     "endpoint" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "notified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "PushSubscription_endpoint_key" ON "PushSubscription"("endpoint");
