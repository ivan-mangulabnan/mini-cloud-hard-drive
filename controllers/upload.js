import upload from "../config/multer.js";
import db from "../db/upload.js";

const uploadFile = () => upload.single('file')

const insertFile = async (req, res) => {
  const file = await db.insertFile(req.user.id, req.file.filename, req.file.size)
  if (!file) {
    return res.send("File isn't inserted")
  }

  res.redirect('/');
}

export default { uploadFile, insertFile };