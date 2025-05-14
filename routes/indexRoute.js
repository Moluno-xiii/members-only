const { Router } = require("express");
const pg = require("../config/pg");

const IndexRoute = Router();

IndexRoute.get("/", async (req, res) => {
  const { rows } = await pg.query("SELECT * FROM messages");
  res.render("index", { messages: rows });
});

module.exports = IndexRoute;
