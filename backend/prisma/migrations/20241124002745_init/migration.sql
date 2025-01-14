-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `piso` INTEGER NOT NULL,
    `patientId` INTEGER NULL,
    `numeroHabitacion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `avatar` VARCHAR(200) NOT NULL DEFAULT '',
    `lastName` VARCHAR(30) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CI` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `status` ENUM('ALIVE', 'DEAD') NOT NULL DEFAULT 'ALIVE',
    `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    `avatar` VARCHAR(200) NOT NULL,
    `lastName` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(30) NOT NULL DEFAULT '',
    `reasonEntry` VARCHAR(300) NOT NULL DEFAULT '',
    `reasonDeath` VARCHAR(300) NOT NULL DEFAULT '',

    UNIQUE INDEX `Patient_CI_key`(`CI`),
    UNIQUE INDEX `Patient_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientId` INTEGER NULL,
    `doctorId` INTEGER NULL,
    `reason` VARCHAR(400) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClinicalStaff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `age` INTEGER NOT NULL,
    `name` VARCHAR(30) NOT NULL DEFAULT '',
    `lastName` VARCHAR(30) NOT NULL DEFAULT '',
    `CI` VARCHAR(191) NOT NULL,
    `placaCarro` VARCHAR(30) NOT NULL DEFAULT '',
    `numeroHijos` VARCHAR(191) NOT NULL DEFAULT '0',
    `area` VARCHAR(30) NOT NULL DEFAULT '',
    `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jubilados` VARCHAR(30) NOT NULL DEFAULT '',
    `egresados` VARCHAR(30) NOT NULL DEFAULT '',
    `tallaCamisas` VARCHAR(30) NOT NULL DEFAULT '',
    `dependencias` VARCHAR(30) NOT NULL DEFAULT '',
    `cargoNominal` VARCHAR(30) NOT NULL DEFAULT '',
    `phone` VARCHAR(30) NOT NULL DEFAULT '',
    `email` VARCHAR(30) NOT NULL DEFAULT '',
    `address` VARCHAR(30) NOT NULL DEFAULT '',
    `avatar` VARCHAR(200) NOT NULL DEFAULT '',

    UNIQUE INDEX `ClinicalStaff_CI_key`(`CI`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consult` ADD CONSTRAINT `Consult_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consult` ADD CONSTRAINT `Consult_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `ClinicalStaff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
