import upload from "../config/multer.js";
import db from "../db/upload.js";

const uploadFile = () => upload.single('file')

const insertFile = async (req, res) => {
  let folderId = req.params.id;
  folderId = folderId ? Number(folderId) : folderId;

  const file = await db.insertFile(req.user.id, req.file.filename, req.file.size, folderId);

  if (!file) {
    return res.send("File isn't inserted")
  }

  const route = folderId ? `/folder/${folderId}` : '/';
  res.redirect(route);
}

export default { uploadFile, insertFile };