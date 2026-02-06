import { Router } from "express";
import * as adminCodeController from "../controllers/adminCodeController.js";

const adminCodeRouter = Router();

adminCodeRouter.post(
  "/api/check-membership",
  adminCodeController.checkMemberStatus,
);

export default adminCodeRouter;
