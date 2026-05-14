import { Schema, model } from "mongoose";
export const clientSchema = new Schema(
  {
    clienteId: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    lastname: { type: String, required: true },
    reference: { type: String, required: true },
    phone: { type: String, required: true },
    active: { type: Boolean, default: true },
    paquete: { type: String, required: true },
    montoMensual: { type: Number, required: true },
    diaDeCorte: { type: Number, required: true, default: 5 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export const MongoClientModel = model("client", clientSchema);
