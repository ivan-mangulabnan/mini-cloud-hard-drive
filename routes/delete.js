import { Router } from "express";
import utils from "../utils/utils.js";
import supabase from "../config/supabase.js";
import { prisma } from "../config/prisma.js";

const deleteRoute = Router();

async function getAllDescendantFiles(folderId) {
  const childFolders = await prisma.folder.findMany({
    where: { parentId: folderId },
    select: { id: true }
  });

  const files = await prisma.file.findMany({
    where: { folderId },
    select: { path: true }
  });

  let filePaths = files.map(f => f.path);

  for (const folder of childFolders) {
    const subPaths = await getAllDescendantFiles(folder.id);
    filePaths = filePaths.concat(subPaths);
  }

  return filePaths;
}

async function deleteSupabaseFiles(paths) {
  if (typeof paths === "string") {
    paths = [paths];
  }

  if (!Array.isArray(paths)) {
    throw new Error("Invalid type: paths must be a string or an array of strings");
  }

  if (paths.length === 0) return;

  const { error } = await supabase.storage.from("assets").remove(paths);

  if (error) throw error;
}


deleteRoute.get('/folder/:id', utils.checkAuth, async (req, res) => {
  const folderId = Number(req.params.id);

  if (Number.isNaN(folderId)) return res.status(400).send('id should be a number');

  const paths = await getAllDescendantFiles(folderId);

  await deleteSupabaseFiles(paths);

  const { parentId } = await prisma.folder.delete({
    where: { id: folderId },
    select: { parentId: true }
  });

  const route = parentId ? `/folder/${parentId}` : '/';
  res.redirect(route);
});

deleteRoute.get('/file/:id', utils.checkAuth, async (req, res) => {
  const fileId = Number(req.params.id);

  if (Number.isNaN(fileId)) return res.status(400).send('id should be a number');

  const { filepath, folderId } = await prisma.file.delete({
    where: { id: fileId },
    select: { path: true, folderId: true }
  });

  await deleteSupabaseFiles(filepath);

  const route = folderId ? `/folder/${folderId}` : '/';
  res.redirect(route);
})

export default deleteRoute;