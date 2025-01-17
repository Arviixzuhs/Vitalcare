/*
  Warnings:

  - Added the required column `updatedAt` to the `Diagnostic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `diagnostic` ADD COLUMN `condition` VARCHAR(280) NOT NULL DEFAULT '',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `note` ADD COLUMN `title` VARCHAR(280) NOT NULL DEFAULT '',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
