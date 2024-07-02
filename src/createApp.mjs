import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import "./strategies/local-strategy.mjs";
import { mockUsers } from "./utils/constants.mjs";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser("helloworld"));
  app.use(
    session({
      secret: "secret",
      saveUninitialized: true,
      resave: true,
      cookie: { maxAge: 60 * 60 * 1000 },
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(routes);

  app.post("/api/auth", passport.authenticate("local"), (req, res) => {
    res.sendStatus(200);
  });

  app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.viseted = true;
    res.cookie("token", "123456789", { maxAge: 60 * 60 * 1000, signed: true });
    res.status(201).send({ message: "Hello World!" });
  });

  app.post("/api/auth", (req, res) => {
    const {
      body: { email, password },
    } = req;

    const findUser = mockUsers.find((user) => user.email === email);

    if (!findUser || findUser.password !== password)
      return res.status(401).send({ message: "Invalid email or password" });

    req.session.user = findUser;
    return res.status(200).send(findUser);
  });

  app.get("/api/auth/status", (req, res) => {
    return req.user ? res.send(req.user) : res.sendStatus(401);
  });

  app.post("/api/auth/logout", (req, res) => {
    if (!req.user) return res.sendStatus(401);

    req.logout((err) => {
      if (err) return res.sendStatus(500);
      res.sendStatus(200);
    });
  });

  app.get("/api/auth/discord", passport.authenticate("discord"));

  app.get(
    "/api/auth/discord/redirect",
    passport.authenticate("discord"),
    (req, res) => {
      res.sendStatus(200);
    }
  );

  return app;
}
