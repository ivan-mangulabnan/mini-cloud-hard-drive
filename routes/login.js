import { Router } from "express";
import controllers from "../controllers/login.js";

const loginRoute = Router();

loginRoute.get('/', controllers.getLogin);
loginRoute.post('/', controllers.authenticate());

export default loginRoute;