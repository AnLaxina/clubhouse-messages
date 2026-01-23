import * as db from "../db/queries.js";

export function postValues(req, res, next) {
  const formValues = req.body;
  db.addUser(
    formValues.firstName,
    formValues.lastName,
    formValues.username,
    formValues.password,
    formValues.memberCode,
    formValues.adminCode,
  );
  res.send({ message: "Success!" });
}
