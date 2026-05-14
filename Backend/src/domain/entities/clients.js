import { randomUUID } from "node:crypto";

export class Client {
  constructor({ id, clienteId, name, lastname, reference, phone, paquete, montoMensual, diaDeCorte = 5, active = true }) {
    this.id = id ||randomUUID();

    this.clienteId = clienteId;
    this.name= name;
    this.lastname=lastname;
    this.reference= reference;
    this.phone = phone;
    this.paquete = paquete;
    this.montoMensual = montoMensual;
    this.diaDeCorte = diaDeCorte;
    this.active= active;
  }

  isValid() {
        return this.clienteId && this.name && this.phone && this.paquete && this.montoMensual !== undefined && this.reference && this.active !== undefined;
    }
  
}
