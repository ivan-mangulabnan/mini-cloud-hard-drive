import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import passport from './config/passport.js';
import { session } from './config/session.js';
import utils from './utils/utils.js';

const app = express();

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const views = path.join(__dirname, 'views');
const assetsPath = path.join(__dirname, 'public');

app.set('views', views);
app.set('view engine', 'ejs');

app.use(session);
app.use(passport.session());
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(utils.setReqUserToLocal);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT, utils.serverNotif);