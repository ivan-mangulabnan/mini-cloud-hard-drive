import { Router } from "express";
import controllers from "../controllers/upload.js";
import utils from "../utils/utils.js";

const uploadRoute = Router();

uploadRoute.post('/', utils.checkAuth, controllers.uploadFile(), controllers.insertFile);
uploadRoute.post('/:id', utils.checkAuth, controllers.uploadFile(), controllers.insertFile);

export default uploadRoute;