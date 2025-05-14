const { Router } = require("express");
const pg = require("../config/pg");

const AdminRole = Router();

AdminRole.get("/", (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message:
        "You're not authorized to see this page, only logged in users can see this page!",
    });
  }
  res.render("admin_role", { error: null });
});

AdminRole.post("/", async (req, res, next) => {
  let error = null;
  if (req.body.club_id !== process.env.CLUBHOUSE_SECRET_ADMIN_ID) {
    error = `Wrong input!`;
    res.render("admin_role", { error });
    return;
  }
  await pg.query("UPDATE users SET user_role = 'admin' WHERE ID = $1", [
    req.user.id,
  ]);
  res.redirect("/");
  next();
});

module.exports = AdminRole;
