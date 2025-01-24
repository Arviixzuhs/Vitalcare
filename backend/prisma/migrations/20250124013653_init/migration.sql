/*
  Warnings:

  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_patientId_fkey`;

-- DropTable
DROP TABLE `room`;
