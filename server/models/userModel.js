import mongoose from "mongoose";
import userModel from "../models/userModel.js";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  photo: { type: String, require: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  creditBalance: { type: Number, default: 10 },
});

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
