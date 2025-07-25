/*
  Warnings:

  - The values [Other] on the enum `EthinicityEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Amber,Other] on the enum `EyeColorEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EthinicityEnum_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian(Chinese, Japanese, Korean)', 'South East Asian(Thai, Indonesian)', 'South Asian(Indian)', 'Middle Eastern(Arabic)', 'Pacific(Polynesian)', 'Hispanic(Latin American)');
ALTER TABLE "Model" ALTER COLUMN "ethinicity" TYPE "EthinicityEnum_new" USING ("ethinicity"::text::"EthinicityEnum_new");
ALTER TYPE "EthinicityEnum" RENAME TO "EthinicityEnum_old";
ALTER TYPE "EthinicityEnum_new" RENAME TO "EthinicityEnum";
DROP TYPE "EthinicityEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EyeColorEnum_new" AS ENUM ('Black', 'Brown', 'Blue', 'Green', 'Hazel', 'Gray');
ALTER TABLE "Model" ALTER COLUMN "eyeColor" TYPE "EyeColorEnum_new" USING ("eyeColor"::text::"EyeColorEnum_new");
ALTER TYPE "EyeColorEnum" RENAME TO "EyeColorEnum_old";
ALTER TYPE "EyeColorEnum_new" RENAME TO "EyeColorEnum";
DROP TYPE "EyeColorEnum_old";
COMMIT;
