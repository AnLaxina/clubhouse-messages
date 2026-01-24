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
    .then(() =>
      res.send({ status: "success", message: "Registration Successful!" }),
    )
    .catch((err) => {
      // This number is just a unique violation that checks if that username already exists
      if (err.code === "23505") {
        res
          .status(409)
          .send({ status: "taken", message: "Username already taken!" });
      } else {
        res.send({ status: "error", message: "Error adding user!" });
      }
    });
}
