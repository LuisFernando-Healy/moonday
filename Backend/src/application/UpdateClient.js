import { validateClientUpdate } from "../application/validators/ClientUpdate.js";

export class UpdateClient {
  constructor(clientRepository, socketService) {
    this.clientRepository = clientRepository;
    this.socketService = socketService;
  }

  async execute(clienteId, locality,clientdata) {
    try {
      const cleandataclient = await validateClientUpdate(clientdata);

      if(!locality || locality.trim() === ""){
        throw new Error("La localidad es obligatoria");
      }

      const updated = await this.clientRepository.findAndUpdate(clienteId , locality, cleandataclient);

      if (!updated) {
        throw new Error(`No se encontro un cliente con el ID: ${clienteId}`);
      }
      
      this.socketService.notify(
        `Se ha actualizado un usuario en ${locality.toUpperCase()}`,
        updated,
      );

      return updated;
    } catch (error) {
        throw new Error(`Ha ocurrido un error ${error.message}`)
    }
  }
}
