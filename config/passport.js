const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const pg = require("./pg");

passport.use(
  new LocalStrategy(async (email, password, callback) => {
    try {
      const { rows } = await pg.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      const user = rows[0];
      if (!user) {
        return callback(null, false, {
          message: "Incorrect email or password",
        });
      }

      const isPasswordMatched = bcrypt.compare(password, user.password_hash);
      if (!isPasswordMatched) {
        return callback(null, false, {
          message: "Incorrect email or password",
        });
      }

      return callback(null, user);
    } catch (err) {
      return callback(err);
    }
  })
);

passport.serializeUser((user, callback) => callback(null, user.id));

passport.deserializeUser(async (userId, callback) => {
  try {
    const { rows } = await pg.query("SELECT * FROM USERS WHERE ID = $1", [
      userId,
    ]);
    const user = rows[0];
    callback(null, user);
  } catch (err) {
    return callback(err);
  }
});
