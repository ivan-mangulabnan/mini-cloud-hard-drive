const getLogout = (req, res) => {
  req.logOut((err) => {
    console.error(err);
  });

  res.redirect('/');
}

export default { getLogout }