import db from '../db/signup.js';

const getSignUp = (req, res) => {
  res.render('index', { route: 'signup' });
}

const postSignUp = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const exists = await db.checkExistence(username);

  if (exists) {
    console.log('user already exists');
    return res.redirect('/signup');
  }

  const user = await db.createUserAndProfile(firstName, lastName, username, password);

  console.log(user);
  res.redirect('/');
}

export default { getSignUp, postSignUp };