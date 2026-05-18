import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // El Folio del cliente que pagó (ej. D10293847)
    clienteId: { 
      type: String, 
      required: true 
    },
    // Para saber de qué mes es el pago (ej. "Mayo 2026", "05-2026")
    mesCorrespondiente: { 
      type: String, 
      required: true 
    },
    // Cuánto pagó realmente
    montoPagado: { 
      type: Number, 
      required: true 
    },
    // Cómo pagó
    metodoPago: { 
      type: String, 
      enum: ["Efectivo", "Transferencia", "Tarjeta"],
      default: "Efectivo"
    },
    // El nombre de quien registró el cobro (opcional, para auditoría)
    registradoPor: {
      type: String,
      default: "Admin"
    }
  },
  { 
    timestamps: true, // Esto creará 'createdAt' (fecha exacta del pago) automáticamente
    versionKey: false 
  }
);

export const paymentModel = mongoose.model("payment", paymentSchema);