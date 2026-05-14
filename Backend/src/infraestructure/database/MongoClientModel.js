import { Schema, model } from "mongoose";
export const clientSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true, unique: true },
    lastname: { type: String, required: true },
    reference: { type: String, required: true },
    phone: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export const MongoClientModel = model("client", clientSchema);
