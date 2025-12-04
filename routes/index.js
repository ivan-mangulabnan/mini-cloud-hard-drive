import { Router } from "express";
import controller from "../controllers/index.js";
import utils from "../utils/utils.js";
import signUpRoute from "./signup.js";

const indexRoute = Router();

indexRoute.use('/signup', signUpRoute);

indexRoute.get('/', utils.checkAuth, controller.getIndex);

export default indexRoute;