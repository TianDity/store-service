/*
  Warnings:

  - You are about to drop the column `purchasePrice` on the `ProductInfo` table. All the data in the column will be lost.
  - You are about to drop the column `retailPrice` on the `ProductInfo` table. All the data in the column will be lost.
  - Added the required column `cost` to the `ProductInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductInfo` DROP COLUMN `purchasePrice`,
    DROP COLUMN `retailPrice`,
    ADD COLUMN `cost` DOUBLE NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;
