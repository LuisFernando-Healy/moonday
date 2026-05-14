import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "client"],
    default: "client",
  },
  associatedClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
    required: false,
  },
}, { timestamps:true});

export const userModel = mongoose.model("user", userSchema);
