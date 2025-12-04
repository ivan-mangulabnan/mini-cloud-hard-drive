const getSignUp = (req, res) => {
  res.render('index', { route: 'signup' });
}

export default { getSignUp };