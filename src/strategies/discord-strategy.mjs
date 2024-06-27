import dotenv from "dotenv";
import passport from "passport";
import { Strategy } from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discord-user.mjs";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await DiscordUser.findById(id);
    return findUser ? done(null, findUser) : done(null, false);
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;

      try {
        findUser = await DiscordUser.findOne({
          discordId: profile.id,
        });
      } catch (err) {
        return done(null, false);
      }

      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });
          const newSavedUser = await newUser.save();
          return done(null, newSavedUser);
        }

        return done(null, findUser);
      } catch (err) {
        return done(null, false);
      }
    }
  )
);
