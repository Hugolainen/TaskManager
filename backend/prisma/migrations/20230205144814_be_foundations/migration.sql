/*
  Warnings:

  - You are about to drop the column `driveNote` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `driveNote`,
    DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `TaskNote` (
    `taskNoteId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`taskNoteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskDriver` (
    `taskDriverId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`taskDriverId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskNote` ADD CONSTRAINT `TaskNote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskNote` ADD CONSTRAINT `TaskNote_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`taskId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskDriver` ADD CONSTRAINT `TaskDriver_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskDriver` ADD CONSTRAINT `TaskDriver_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`taskId`) ON DELETE RESTRICT ON UPDATE CASCADE;
