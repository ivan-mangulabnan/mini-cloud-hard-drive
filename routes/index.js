import { Router } from "express";
import controller from "../controllers/index.js";

const indexRoute = Router();

indexRoute.get('/', controller.getIndex);

export default indexRoute;