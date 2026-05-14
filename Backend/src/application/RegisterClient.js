
import { validateUser } from "./validators/ClientRegister.js";
export class RegisterClient {

  constructor(clientRepository, socketService) {
    this.clientRepository = clientRepository;
    this.socketService = socketService;
  }

  async execute (clientdata, locality) {
  
     const cleandataclient = await validateUser(clientdata);

      if(!locality || locality.trim() === ""){
        throw new Error("La localidad es obligatoria");
      }

      const savedClient = await this.clientRepository.save(cleandataclient, locality);
      this.socketService.notify(`Nuevo cliente registrado ${locality.toUpperCase()}`, savedClient);

      return savedClient;    
  }
  
}
