const { Router } = require("express");
const passport = require("passport");

const Login = Router();

Login.get("/", (req, res, next) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { message: messages[0] || null });
});

Login.post(
  "/",
  passport.authenticate("local", {
    failureMessage: true,
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

module.exports = Login;
