-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `nickName` VARCHAR(191) NULL,
    `openId` VARCHAR(191) NOT NULL,
    `unionId` VARCHAR(191) NULL,
    `headImgUrl` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `role` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_openId_key`(`openId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `isDefault` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Address_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BrandInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brandName` VARCHAR(191) NOT NULL,
    `brandField` VARCHAR(191) NOT NULL,
    `brandLogo` VARCHAR(191) NULL,
    `brandOrder` VARCHAR(191) NULL,
    `brandStatus` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BrandInfo_brandName_key`(`brandName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `categoryField` VARCHAR(191) NOT NULL,
    `categoryImg` VARCHAR(191) NULL,
    `categoryLevel` INTEGER NOT NULL,
    `categoryStatus` INTEGER NOT NULL DEFAULT 1,
    `parentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productCode` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `productModel` VARCHAR(191) NULL,
    `productSubtitle` VARCHAR(191) NULL,
    `productKeywords` VARCHAR(191) NULL,
    `descript` VARCHAR(191) NULL,
    `productDetail` JSON NULL,
    `productParams` JSON NULL,
    `brandId` VARCHAR(191) NOT NULL,
    `retailPrice` DOUBLE NOT NULL,
    `purchasePrice` DOUBLE NOT NULL,
    `averageFactor` DOUBLE NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `minStock` INTEGER NOT NULL,
    `oneCategoryId` VARCHAR(191) NOT NULL,
    `twoCategoryId` VARCHAR(191) NOT NULL,
    `sort` INTEGER NOT NULL,
    `onlyShow` INTEGER NOT NULL DEFAULT 0,
    `auditStatus` INTEGER NOT NULL DEFAULT 1,
    `publishStatus` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductInfo_productCode_key`(`productCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductPicInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `picDesc` VARCHAR(191) NULL,
    `ossKey` VARCHAR(191) NULL,
    `picUrl` VARCHAR(191) NOT NULL,
    `isMaster` INTEGER NOT NULL DEFAULT 0,
    `picSort` INTEGER NOT NULL,
    `picStatus` INTEGER NOT NULL DEFAULT 1,
    `productInfoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`openId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPicInfo` ADD CONSTRAINT `ProductPicInfo_productInfoId_fkey` FOREIGN KEY (`productInfoId`) REFERENCES `ProductInfo`(`productCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
