import * as db from "../db/queries.js";

export async function checkMemberStatus(req, res, next) {
  const userId = req.user.id;
  const formValues = req.body;

  await db.editStatus(userId, formValues.memberCode, formValues.adminCode);
  res.send({ chicken: "Mambo" });
}
