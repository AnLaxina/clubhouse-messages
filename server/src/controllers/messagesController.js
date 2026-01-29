import * as db from "../db/queries.js";

// export async function addMessage(req, res, next) {
//     const formValues = req.body;
//     await db.addMessage(userId, title, text);
// }

export async function getUser(req, res, next) {
  const { userId } = req.params;
  const user = await db.getUser(userId);
  return user;
}

export async function getAllMessages(req, res, next) {
  const messages = await db.getAllMessages();
  res.send({ messages: messages });
}
