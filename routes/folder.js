import { Router } from "express";
import { prisma } from "../config/prisma.js";
import utils from "../utils/utils.js";

const folderRoute = Router();

folderRoute.post('/', utils.checkAuth, async (req, res) => {
  const { name } = req.body;

  try {
    const existing = await prisma.folder.findFirst({
      where: {
        ownerId: req.user.id,
        name,
        parentId: null
      }
    });

    if (existing) {
      return res.status(400).send("Folder already exists");
    }

    const folder = await prisma.folder.create({
      data: {
        ownerId: req.user.id,
        name,
      }
    });

    if (!folder) return res.send("Can't create a folder");

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
})

async function getBreadcrumb(prisma, folderId, userId) {
  const breadcrumb = [];
  let currentId = folderId;

  while (currentId) {
    const folder = await prisma.folder.findUnique({
      where: { id: currentId },
      include: { parent: true },
    });

    if (!folder || folder.ownerId !== userId) break;

    breadcrumb.push({ id: folder.id, name: folder.name });

    currentId = folder.parentId;
  }

  breadcrumb.push({ id: null, name: 'Home' });

  return breadcrumb.reverse();
}

folderRoute.get('/:id', utils.checkAuth, async (req, res) => {
  const folderId = Number(req.params.id);
  const [files, folders] = await Promise.all([
    prisma.file.findMany({
      where: {
        ownerId: req.user.id,
        folderId,
      }
    }),
    prisma.folder.findMany({
      where: {
        ownerId: req.user.id,
        parentId: folderId,
      }
    })
  ]);

  const breadcrumb = await getBreadcrumb(prisma, folderId, req.user.id);

  res.locals.folderId = folderId;
  res.locals.assets = { files, folders };
  res.locals.breadcrumb = breadcrumb;

  res.render('index');
})

folderRoute.post('/:id', utils.checkAuth, async (req, res) => {
  const { name } = req.body;
  const folderId = Number(req.params.id);

  try {
    const folder = await prisma.folder.create({
      data: {
        ownerId: req.user.id,
        name,
        parentId: folderId
      }
    });

    if (!folder) return res.send("Can't create a folder");

    res.redirect(`/folder/${folderId}`);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).send("Folder name already exists in this folder");
    }
    console.error(err);
    res.status(500).send("Server Error");
  }
})

export default folderRoute;