import { Router } from "express";
import * as messagesController from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/api/get-messages", messagesController.getAllMessages);
messagesRouter.get("/api/get-user/:userId", messagesController.getUser);

export default messagesRouter;
