-- AlterTable
ALTER TABLE `note` ADD COLUMN `patientId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
