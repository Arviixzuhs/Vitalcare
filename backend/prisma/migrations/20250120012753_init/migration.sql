-- AlterTable
ALTER TABLE `clinicalstaff` MODIFY `email` VARCHAR(254) NULL DEFAULT '',
    MODIFY `address` VARCHAR(180) NULL DEFAULT '',
    MODIFY `dependencias` VARCHAR(180) NULL DEFAULT '',
    MODIFY `ubicacionFiscal` VARCHAR(180) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `patient` MODIFY `email` VARCHAR(254) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(254) NOT NULL;
