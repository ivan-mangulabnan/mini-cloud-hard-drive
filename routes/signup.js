import { Router } from "express";
import controllers from "../controllers/signup.js";

const signUpRoute = Router();

signUpRoute.get('/', controllers.getSignUp);

export default signUpRoute;