import { Router } from "express";
import * as messagesController from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/api/get-messages", messagesController.getAllMessages);

export default messagesRouter;
