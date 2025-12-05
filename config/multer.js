import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadFolder = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({ 
  destination: uploadFolder,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const limits = { fileSize: 1 * 1024 * 1024 };

const upload = multer({ storage, limits });

export default upload;