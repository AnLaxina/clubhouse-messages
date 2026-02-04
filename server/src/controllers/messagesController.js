import * as db from "../db/queries.js";

export async function addMessage(req, res, next) {
  const formValues = req.body;
  const currentUser = req.user;

  await db.addMessage(currentUser.id, formValues.title, formValues.text);
  res.send({ message: "Message successfully added!" });
}

export async function deleteMessage(req, res, next) {
  const { messageId } = req.params;
  await db.deleteMessage(messageId);
  res.send({ message: "Message successfully deleted!" });
}

export async function getUser(req, res, next) {
  const { userId } = req.params;
  const user = await db.getUser(userId);
  res.send({ user: user });
}

export async function getAllMessages(req, res, next) {
  const messages = await db.getAllMessages();
  res.send({ messages: messages });
}
