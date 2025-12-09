import { Router } from "express";
import utils from "../utils/utils.js";
import { prisma } from "../config/prisma.js";
import supabase from "../config/supabase.js";

const downloadRoute = Router();

downloadRoute.get('/:id', utils.checkAuth, async (req, res) => {
  const fileId = Number(req.params.id);
  if (Number.isNaN(fileId)) return res.send('wrong id type');

  const fileInfo = await prisma.file.findUnique({
    where: { id: fileId }
  });

  if (!fileInfo) return res.send('non-existent file');

  const { data, error } = await supabase.storage.from('assets').download(fileInfo.path);

  if (error) return res.send('supabase error');

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${fileInfo.name}"`);

  const buffer = Buffer.from(await data.arrayBuffer());
  res.send(buffer);
});

export default downloadRoute;