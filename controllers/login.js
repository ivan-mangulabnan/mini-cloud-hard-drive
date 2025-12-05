import passport from "passport";

const getLogin = (req, res) => {
  res.render('index', { route: 'login' });
}

const authenticate = () => passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });

export default { getLogin, authenticate };