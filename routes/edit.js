import { Router } from "express";
import utils from "../utils/utils.js";
import { prisma } from "../config/prisma.js";
import supabase from "../config/supabase.js";

const editRoute = Router();

editRoute.post('/file/:id', utils.checkAuth, async (req, res) => {
  const fileId = Number(req.params.id);
  const { name } = req.body;

  if (Number.isNaN(fileId)) return res.status(400).send('id should be a number');

  try {
    const file = await prisma.file.findUnique({
      where: { id: fileId }
    });

    if (!file) {
      return res.status(404).send('File not found');
    }

    const updateData = { name };

    if (file.path) {
      const parts = file.path.split('/');
      if (parts.length === 2) {
        const dir = parts[0];
        const filenamePart = parts[1];

        const firstHyphenIndex = filenamePart.indexOf('-');
        if (firstHyphenIndex !== -1) {
          const timestamp = filenamePart.substring(0, firstHyphenIndex);
          const newPath = `${dir}/${timestamp}-${name}`;

          const { error: supabaseError } = await supabase
            .storage
            .from('assets')
            .move(file.path, newPath);

          if (supabaseError) {
            console.error('Supabase Move Error:', supabaseError);
            return res.status(500).send('Error renaming file in storage');
          }

          updateData.path = newPath;
        }
      }
    }

    await prisma.file.update({
      where: { id: fileId },
      data: updateData
    });

    res.redirect(file.folderId ? `/folder/${file.folderId}` : '/');

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default editRoute;