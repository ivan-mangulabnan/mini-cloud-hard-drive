import db from '../db/signup.js';

const getSignUp = (req, res) => {
  res.render('index', { route: 'signup' });
}

const postSignUp = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  const user = await db.createUserAndProfile(firstName, lastName, username, password);

  console.log(`user created: ${user}`);
  res.render('index', { route: 'login' });
}

export default { getSignUp, postSignUp };