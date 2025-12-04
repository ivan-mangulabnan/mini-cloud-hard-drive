import { Router } from "express";
import controller from "../controllers/index.js";
import utils from "../utils/utils.js";

const indexRoute = Router();

indexRoute.get('/', utils.checkAuth, controller.getIndex);

export default indexRoute;