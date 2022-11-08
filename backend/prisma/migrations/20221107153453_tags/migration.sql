-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
