const { Router } = require("express");

const LogoutRoute = Router();

LogoutRoute.get("/", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

module.exports = LogoutRoute;
