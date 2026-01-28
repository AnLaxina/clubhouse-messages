import * as db from "../db/queries.js";

// TODO: Get this working
export async function addMessage(req, res, next) {
    const formValues = req.body;
    await db.addMessage(userId, title, text);
}

export async function getAllMessages(req, res, next) {
    const messages = await db.getAllMessages();
    res.send({ messages: messages });
}
