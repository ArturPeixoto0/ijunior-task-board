/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `senha` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `senha` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Client_email_key` ON `Client`(`email`);
