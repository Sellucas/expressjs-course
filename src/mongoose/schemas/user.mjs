import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true, unique: true },
  displayname: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true },
  password: { type: mongoose.Schema.Types.String, required: true },
});

export const User = mongoose.model("user", userSchema);
