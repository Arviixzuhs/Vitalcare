/*
  Warnings:

  - You are about to drop the `patientfile` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `createdAt` on table `clinicalstaff` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `patientfile` DROP FOREIGN KEY `PatientFile_patientId_fkey`;

-- AlterTable
ALTER TABLE `clinicalstaff` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `patientfile`;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
