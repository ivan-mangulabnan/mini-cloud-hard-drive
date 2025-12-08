import { Router } from "express";
import { prisma } from "../config/prisma.js";
import utils from "../utils/utils.js";

const folderRoute = Router();

folderRoute.post('/', utils.checkAuth, async (req, res) => {
  const { name } = req.body;
  const folder = await prisma.folder.create({
    data: {
      ownerId: req.user.id,
      name,
    }
  });

  if (!folder) return res.send("Can't create a folder");

  res.redirect('/');
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

    currentId = folder.parentId; // go up
  }

  // Add root (home)
  breadcrumb.push({ id: null, name: 'Home' });

  return breadcrumb.reverse(); // start from Home
}

folderRoute.get('/:id', utils.checkAuth, async (req, res) => {
  const folderId = Number(req.params.id);
  const [ files, folders, parentFolder ] = await Promise.all([
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
    }),
    prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        parent: true
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

  const folder = await prisma.folder.create({
    data: {
      ownerId: req.user.id,
      name,
      parentId: folderId
    }
  });

  if (!folder) return res.send("Can't create a folder");

  res.redirect(`/folder/${folderId}`);
})

export default folderRoute;