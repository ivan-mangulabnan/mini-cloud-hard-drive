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

export default { setReqUserToLocal, serverNotif, checkAuth };