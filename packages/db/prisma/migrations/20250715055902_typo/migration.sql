/*
  Warnings:

  - You are about to drop the column `ethinicity` on the `Model` table. All the data in the column will be lost.
  - Added the required column `ethnicity` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EthnicityEnum" AS ENUM ('White', 'Black', 'Asian American', 'East Asian(Chinese, Japanese, Korean)', 'South East Asian(Thai, Indonesian)', 'South Asian(Indian)', 'Middle Eastern(Arabic)', 'Pacific(Polynesian)', 'Hispanic(Latin American)');

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "ethinicity",
ADD COLUMN     "ethnicity" "EthnicityEnum" NOT NULL;

-- DropEnum
DROP TYPE "EthinicityEnum";
