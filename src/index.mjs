import mongoose from "mongoose";

import { createApp } from "./createApp.mjs";
// import "./strategies/discord-strategy.mjs";

mongoose
  .connect("mongodb://localhost:27017/express-tutorial")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
