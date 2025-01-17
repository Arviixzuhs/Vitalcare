-- AlterTable
ALTER TABLE `clinicalstaff` ADD COLUMN `type` VARCHAR(80) NULL DEFAULT '',
    ADD COLUMN `ubicacionFiscal` VARCHAR(80) NULL DEFAULT '',
    MODIFY `name` VARCHAR(30) NULL DEFAULT '',
    MODIFY `lastName` VARCHAR(30) NULL DEFAULT '',
    MODIFY `placaCarro` VARCHAR(30) NULL DEFAULT '',
    MODIFY `numeroHijos` VARCHAR(191) NULL DEFAULT '0',
    MODIFY `area` VARCHAR(30) NULL DEFAULT '',
    MODIFY `jubilados` VARCHAR(30) NULL DEFAULT '',
    MODIFY `egresados` VARCHAR(30) NULL DEFAULT '',
    MODIFY `tallaCamisas` VARCHAR(30) NULL DEFAULT '',
    MODIFY `dependencias` VARCHAR(30) NULL DEFAULT '',
    MODIFY `cargoNominal` VARCHAR(30) NULL DEFAULT '',
    MODIFY `phone` VARCHAR(30) NULL DEFAULT '',
    MODIFY `email` VARCHAR(30) NULL DEFAULT '',
    MODIFY `address` VARCHAR(30) NULL DEFAULT '',
    MODIFY `avatar` VARCHAR(200) NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(280) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diagnostic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NULL,
    `patientId` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(280) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileURL` VARCHAR(191) NULL,
    `patientId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diagnostic` ADD CONSTRAINT `Diagnostic_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `ClinicalStaff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnostic` ADD CONSTRAINT `Diagnostic_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientFile` ADD CONSTRAINT `PatientFile_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
