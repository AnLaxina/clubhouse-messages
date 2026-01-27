import { Router } from "express";
import passport from "passport";
import * as loginController from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post(
  "/log-in",
  passport.authenticate("local"),
  loginController.loginSuccess,
);

loginRouter.get("/api/check-logged-in", loginController.checkLoggedIn);

export default loginRouter;
