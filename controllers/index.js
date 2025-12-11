import db from '../db/main.js';

const getIndex = async (req, res) => {
  res.locals.assets = await db.getRootFilesAndFolders(req.user.id);
  res.locals.folderId = null;
  res.locals.breadcrumb = [{ id: null, name: 'Home' }];
  
  res.render('index');
}

export default { getIndex };