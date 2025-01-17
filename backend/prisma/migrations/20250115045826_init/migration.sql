/*
  Warnings:

  - Made the column `patientId` on table `note` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_patientId_fkey`;

-- AlterTable
ALTER TABLE `note` MODIFY `patientId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
