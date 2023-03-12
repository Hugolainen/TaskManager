/*
  Warnings:

  - The values [archived] on the enum `Task_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[taskId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskDriverId]` on the table `TaskDriver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskNoteId]` on the table `TaskNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TaskDriver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TaskNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `title` TEXT NOT NULL,
    MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `status` ENUM('pending', 'active', 'done', 'billed') NOT NULL;

-- AlterTable
ALTER TABLE `taskdriver` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `tasknote` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `content` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `refreshTokenId` VARCHAR(191) NOT NULL,
    `hashedToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RefreshToken_refreshTokenId_key`(`refreshTokenId`),
    PRIMARY KEY (`refreshTokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Task_taskId_key` ON `Task`(`taskId`);

-- CreateIndex
CREATE UNIQUE INDEX `TaskDriver_taskDriverId_key` ON `TaskDriver`(`taskDriverId`);

-- CreateIndex
CREATE UNIQUE INDEX `TaskNote_taskNoteId_key` ON `TaskNote`(`taskNoteId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_userId_key` ON `User`(`userId`);

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
