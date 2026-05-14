import { randomUUID } from "node:crypto";

export class Client {
  constructor({ id, name, lastname, reference, phone, active = true }) {
    this.id = id ||randomUUID();
    this.name= name;
    this.lastname=lastname;
    this.reference= reference;
    this.phone = phone;
    this.active= active;
  }

  isValid() {
        return this.name && this.phone && this.locality && this.reference && this.active !== undefined;
    }
  
}
