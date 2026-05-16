import { paymentModel } from "./Models/MongoPaymentModel.js";

export class MongoPaymentRepository {
  //guardar un pago
  async save(paymentData) {
    try {
      const newPayment = new paymentModel(paymentData);
      return await newPayment.save();
    } catch (error) {
      console.error("Error al guardar el pago en la BD:", error);
      throw error;
    }
  }

  //obtener todos los pagos de un cliente
  async getPaymentsByClient(clienteId) {
    try {
      return await paymentModel.find({ clienteId: clienteId }).sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error al obtener el historial de pagos:", error);
      throw error;
    }
  }

  //obtener todos los pagos de un mes especifico
  async getByMonth(mes) {
    try {
      return await paymentModel.find({ mesCorrespondiente: mes });
    } catch (error) {
      console.error("Error al obtener los pagos por mes:", error);
      throw error;
    }
  }

  //obtener todos los pagos - para el historial
  async getAll() {
    try {
      return await paymentModel.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error al obtener todos los pagos:", error);
      throw error;
    }
  }
}

