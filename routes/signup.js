const { Router } = require("express");
const pg = require("../config/pg");
const bcrypt = require("bcryptjs");

const Signup = Router();

Signup.get("/", (req, res, next) => {
  let error = null;
  res.render("signup", { error });
});

Signup.post("/", async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    error = "password fields do not match";
    res.render("signup", { error });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await pg.query(
    "INSERT INTO users (firstname, lastname, email, password_hash, user_role) VALUES($1, $2, $3, $4, $5)",
    [firstname, lastname, email, hashedPassword, null]
  );
  res.redirect("/login");
});

module.exports = Signup;
