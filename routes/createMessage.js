const { Router } = require("express");
const pg = require("../config/pg");

const CreateMessage = Router();

CreateMessage.get("/", (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "You are not authenticated, log in to access this route",
    });
  }
  res.render("create_message");
});

CreateMessage.post("/", async (req, res) => {
  const { firstname, lastname, email } = req.user;
  const { message_title, message_body } = req.body;

  await pg.query(
    "INSERT INTO messages (firstname, lastname, message_title, message_body, email) VALUES($1, $2, $3, $4, $5)",
    [firstname, lastname, message_title, message_body, email]
  );
  res.redirect("/");
});

module.exports = CreateMessage;
