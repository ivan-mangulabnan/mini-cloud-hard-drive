/*
  Warnings:

  - A unique constraint covering the columns `[name,folder_id,owner_id]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,parent_id,owner_id]` on the table `folders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_folder_id_fkey";

-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_parent_id_fkey";

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "path" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "files_name_folder_id_owner_id_key" ON "files"("name", "folder_id", "owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "folders_name_parent_id_owner_id_key" ON "folders"("name", "parent_id", "owner_id");

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
