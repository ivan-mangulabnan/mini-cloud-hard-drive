import upload from "../config/multer.js";
import db from "../db/upload.js";
import supabase from "../config/supabase.js";

const uploadFile = () => upload.single('file')

const insertFile = async (req, res) => {
  if (!req.file) return res.redirect('/logout');

  let folderId = req.params.id;
  folderId = folderId ? Number(folderId) : folderId;

  const filePath = `${req.user.id}-${Date.now()}-${req.file.originalname}`;
  const { error } = await supabase.storage.from('assets').upload(filePath, req.file.buffer, { contentType: req.file.mimetype });

  if (error) return res.send('supabase error');

  const file = await db.insertFile(req.user.id, req.file.originalname, req.file.size, filePath, folderId);

  if (!file) {
    return res.send("File isn't inserted")
  }

  const route = folderId ? `/folder/${folderId}` : '/';
  res.redirect(route);
}

export default { uploadFile, insertFile };