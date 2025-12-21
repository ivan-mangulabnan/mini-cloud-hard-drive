import { Router } from "express";
import utils from "../utils/utils.js";
import { prisma } from "../config/prisma.js";

const editRoute = Router();

editRoute.post('/file/:id', utils.checkAuth, async (req, res) => {
  const fileId = Number(req.params.id);
  const { name } = req.body.name;

  if (Number.isNaN(fileId)) return res.status(400).send('id should be a number');

  const {} = await prisma.file.update({
    where: { id: fileId },
    data: {
      name
    }
  })
})