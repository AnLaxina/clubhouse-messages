import { Router } from "express";
import * as signupController from "../controllers/signupController.js";
const signupRouter = Router();

signupRouter.post("/sign-up", signupController.postValues);

export default signupRouter;
