-- AlterTable
ALTER TABLE "JobPhoto" ADD COLUMN "key" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN "pdfKey" TEXT;
