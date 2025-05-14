const { Router } = require("express");
const pg = require("../config/pg");

const JoinClub = Router();

JoinClub.get("/", (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message:
        "You're not authorized to see this page, only logged in users can see this page!",
    });
  }
  res.render("join_club", { error: null });
});

JoinClub.post("/", async (req, res, next) => {
  let error = null;
  if (req.body.club_id !== process.env.CLUBHOUSE_SECRET_ID) {
    error = `Wrong ID, club doesn't exist!`;
    res.render("join_club", { error });
    return;
  }
  if (req.user.user_role) return res.redirect("/");
  await pg.query("UPDATE users SET user_role = 'member' WHERE ID = $1", [
    req.user.id,
  ]);
  res.redirect("/");
  next();
});

module.exports = JoinClub;
