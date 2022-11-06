/*
  Warnings:

  - You are about to drop the column `verify_key` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secondary_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Event_user_id_key";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "online" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verify_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_secondary_email_key" ON "User"("secondary_email");
