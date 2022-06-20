/*
  Warnings:

  - You are about to drop the column `averageFactor` on the `ProductInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProductCategory` ADD COLUMN `averageFactor` DOUBLE NOT NULL DEFAULT 0.0002;

-- AlterTable
ALTER TABLE `ProductInfo` DROP COLUMN `averageFactor`,
    ADD COLUMN `productPic` JSON NULL,
    MODIFY `place` VARCHAR(191) NULL,
    MODIFY `minStock` INTEGER NOT NULL DEFAULT 5,
    MODIFY `sort` INTEGER NOT NULL DEFAULT 0;
