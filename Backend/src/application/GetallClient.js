export class GetallClient {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
   
  }

  async execute(locality) {
    try {
      if (!locality) {
        throw new Error("La localidad es obligatoria");
      }

      return await this.clientsRepository.getAll(locality);
     

    } catch (error) {
        throw new Error("Error al obtener los clientes")
    }
  }
}
