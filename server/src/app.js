import express from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import cors from "cors";
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

import "dotenv/config";
import pool from "./db/pool.js";
import signupRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";
// Basic Setup
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Passport setup
const pgSession = connectPg(session);
app.use(
  session({
    secret: process.env.TOP_SECRET_THING,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
// I'm not writing a route for logout... it's so short lol...
app.post("/log-out", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie("connect.sid");

      res.json({ message: "Logged out successfully!" });
    });
  });
});

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const matchedResult = await bcrypt.compare(password, user.password);
      if (!matchedResult) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// Routes
app.use(signupRouter);
app.use(loginRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }

  console.log("Running on PORT: " + PORT);
});
