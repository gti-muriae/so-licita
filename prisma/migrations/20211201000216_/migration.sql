/*
  Warnings:

  - You are about to drop the column `desc_nome` on the `categoria` table. All the data in the column will be lost.
  - Added the required column `descNome` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `desc_nome`,
    ADD COLUMN `descNome` VARCHAR(50) NOT NULL;
