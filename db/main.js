import { prisma } from "../config/prisma.js";

const getRootFilesAndFolders = async (userId) => {
  const [files, folders] = await Promise.all([
    prisma.file.findMany({
      where: {
        ownerId: userId,
        folderId: null,
      },
    }),
    prisma.folder.findMany({
      where: {
        ownerId: userId,
        parentId: null,
      },
    }),
  ]);

  return { files, folders };
}

export default { getRootFilesAndFolders };