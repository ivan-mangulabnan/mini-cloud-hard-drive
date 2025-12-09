import { prisma } from "../config/prisma.js";

const insertFile = async (userId, fileName, size, path, folderId) => {
  const file = prisma.file.create({
    data: {
      name: fileName,
      ownerId: userId,
      size,
      path,
      folderId: folderId ? folderId : null
    }
  })

  return file;
}

export default { insertFile }