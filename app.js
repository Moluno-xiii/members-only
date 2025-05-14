require("dotenv").config();
require("./config/passport");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const path = require("node:path");
const pg = require("./config/pg");
const IndexRoute = require("./routes/indexRoute");
const CreateMessage = require("./routes/createMessage");
const JoinClub = require("./routes/joinClub");
const Signup = require("./routes/signup");
const Login = require("./routes/login");
const DeleteMessage = require("./routes/deleteMessage");
const LogoutRoute = require("./routes/logout");
const AdminRole = require("./routes/adminRole");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    store: new pgSession({
      pool: pg,
      tableName: "sessions",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", IndexRoute);
app.use("/create-message", CreateMessage);
app.use("/join-club", JoinClub);
app.use("/signup", Signup);
app.use("/login", Login);
app.use("/logout", LogoutRoute);
app.use("/delete-message", DeleteMessage);
app.use("/admin-role", AdminRole);
app.use((req, res) => res.status(404).json({ message: "Page not found" }));

app.listen(process.env.PORT, () =>
  console.log(`___listening on port ${process.env.PORT}___`)
);
