import { Router } from "express";
import passport from "passport";
import * as loginController from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post(
  "/log-in",
  passport.authenticate("local"),
  loginController.loginSuccess,
);

export default loginRouter;
