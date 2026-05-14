export class clientsrepository {
  async save(client) {
    throw new Error("Error: El método 'save' debe ser implementado por un adaptador de infraestructura.");
  }

  async findById(id) {
    throw new Error("Error: El método 'findById' debe ser implementado.");
  }

  async delete(id) {
    throw new Error("Error: El método 'delete' debe ser implementado.");
  }

  async getAll(){
    throw new Error("Error: El metodo 'getAll' debe ser implementado.");
  }
  
  
}