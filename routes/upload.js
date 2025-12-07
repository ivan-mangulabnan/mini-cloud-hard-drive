import { Router } from "express";
import controllers from "../controllers/upload.js";
import utils from "../utils/utils.js";

const uploadRoute = Router();

// uploadRoute.get('/', controllers.getSignUp);
uploadRoute.post('/', utils.checkAuth, controllers.uploadFile(), controllers.insertFile);

export default uploadRoute;