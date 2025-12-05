import { Router } from "express";
import controller from "../controllers/index.js";
import utils from "../utils/utils.js";
import signUpRoute from "./signup.js";
import loginRoute from "./login.js";
import logoutRoute from "./logout.js";

const indexRoute = Router();

indexRoute.use('/signup', signUpRoute);
indexRoute.use('/login', loginRoute);
indexRoute.use('/logout', logoutRoute);

indexRoute.get('/', utils.checkAuth, controller.getIndex);

export default indexRoute;