export function loginSuccess(req, res, next) {
  console.log("Login successful!");
  console.log(req.body);
  res.json({ message: "Success!" });
}
