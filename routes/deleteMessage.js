const { Router } = require("express");
const pg = require("../config/pg");

const DeleteMessage = Router();

DeleteMessage.get("/:messageId", async (req, res) => {
  await pg.query("DELETE FROM messages where id = $1", [req.params.messageId]);
  res.redirect("/");
});

module.exports = DeleteMessage;
