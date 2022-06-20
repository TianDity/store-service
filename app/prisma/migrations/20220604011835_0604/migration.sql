-- AlterTable
ALTER TABLE `ProductCategory` ADD COLUMN `isHot` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ProductInfo` MODIFY `brandId` VARCHAR(191) NULL;
