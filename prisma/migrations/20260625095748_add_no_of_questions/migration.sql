/*
  Warnings:

  - Added the required column `noOfQuestions` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `test` ADD COLUMN `noOfQuestions` INTEGER NOT NULL;
