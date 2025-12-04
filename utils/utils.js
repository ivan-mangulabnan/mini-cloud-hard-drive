const setReqUserToLocal = (req, res, next) => {
  res.locals.user = req.user;
  next();
}

const serverNotif = (err) => {
  if (err) return console.error(`server error: ${err}`);

  console.log('Server running...');
}

export default { setReqUserToLocal, serverNotif };