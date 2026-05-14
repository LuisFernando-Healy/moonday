import mongoose from "mongoose";
import { clientSchema } from "./Models/MongoClientModel.js";

export class MongoClientRepository {
  _getmodel(collectionName) {
    return (
      mongoose.models[collectionName] ||
      mongoose.model(collectionName, clientSchema)
    );
  }

  async save(client, locality) {
    try {
      const Model = this._getmodel(locality.toLowerCase());

      const mongoClient = new Model ({
        clienteId: client.clienteId,
        name: client.name,
        lastname: client.lastname,
        reference: client.reference,
        phone: client.phone,
        paquete: client.paquete,
        montoMensual: client.montoMensual,
        diaDeCorte: client.diaDeCorte,
        active: client.active,
      });

      
      console.log("CLIENT RECIBIDO:", client);
      return await mongoClient.save();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      throw error;
    }
  }


  async getAll(locality) {
    try {
      const Model = this._getmodel(locality.toLowerCase());
      return await Model.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      throw error;
    }
  }

  async delete(clienteId, locality) {
    try {
      const Model = this._getmodel(locality.toLowerCase());
      return await Model.findByIdAndDelete(clienteId);
    } catch (error) {
      console.error("Error al eliminar cliente", error);
      throw error;
    }
  }

  async getOne(clienteId, locality) {
    try {
      const Model = this._getmodel(locality.toLowerCase());
      return await Model.find({
        clienteId: { $regex: clienteId, $options: "i" },
      }).limit(5);
    } catch (error) {
      console.error("Error al obtener un cliente", error);
      throw error;
    }
  }

  async findAndUpdate(clienteId, locality, clientdata) {
    try {
      const Model = this._getmodel(locality.toLowerCase());
      return await Model.findOneAndUpdate(
        {
          clienteId: clienteId,
        },
        clientdata,
        { new: true },
      );
    } catch (error) {
      throw new Error(`Ha ocurrido un erro ${error.message}`);
    }
  }
}