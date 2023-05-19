/*
  Warnings:

  - Added the required column `lastMessageCreatedAt` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `lastMessageCreatedAt` DATETIME(6) NOT NULL;
