const setReqUserToLocal = (req, res, next) => {
  res.locals.user = req.user;
  next();
}

const serverNotif = (err) => {
  if (err) return console.error(`server error: ${err}`);

  console.log('Server running...');
}

const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  next();
}

const removeResponseCache = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
}

export default { setReqUserToLocal, serverNotif, checkAuth, removeResponseCache };