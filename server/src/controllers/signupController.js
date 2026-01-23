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
  )
    .then(() => res.send({ message: "Registration Successful!" }))
    .catch((err) => {
      // This number is just a unique violation that checks if that username already exists
      if (err.code === "23505") {
        res.send({ message: "Username already taken!" });
      } else {
        res.send({ message: "Error adding user!" });
      }
    });
}
