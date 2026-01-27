export function loginSuccess(req, res, next) {
  console.log("Login successful!");
  console.log(req.body);
  return res.json({ message: "Success!", user: req.user });
}

export function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.json({ message: "Logged in!", user: req.user });
  }
  res.json({ message: "Not logged in!" });
}
