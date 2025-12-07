import { prisma } from "../config/prisma.js";

const insertFile = async (userId, fileName, size) => {
  const file = prisma.file.create({
    data: {
      name: fileName,
      ownerId: userId,
      size
    }
  })

  return file;
}

export default { insertFile }