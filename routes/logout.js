import { Router } from "express";
import controllers from "../controllers/logout.js";

const logoutRoute = Router();

logoutRoute.get('/', controllers.getLogout);

export default logoutRoute;