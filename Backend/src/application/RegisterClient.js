
import { validateUser } from "./validators/ClientRegister.js";
export class RegisterClient {

  constructor(clientRepository, socketService, registerUserUseCase) {
    this.clientRepository = clientRepository;
    this.socketService = socketService;
    this.registerUserUseCase = registerUserUseCase;
  }

  async execute (clientdata, locality) {
  
     const cleandataclient = await validateUser(clientdata);

      if(!locality || locality.trim() === ""){
        throw new Error("La localidad es obligatoria");
      }

      const savedClient = await this.clientRepository.save(cleandataclient, locality);
      this.socketService.notify(`Nuevo cliente registrado ${locality.toUpperCase()}`, savedClient);

      try {
        const credencialesWeb = {
          username: savedClient.clienteId,
          password: savedClient.phone,
          role: "client",
          associatedClientId: savedClient._id.toString(),
          fullName: savedClient.name,
        };

        await this.registerUserUseCase.execute(credencialesWeb);
        console.log(`Cuenta generada para cliente: ${savedClient.clienteId}`)
      } catch (error) {
        console.error(`Error al generar cuenta para cliente: ${savedClient.clienteId}`, error);
      }

      return savedClient;    
  }
  
}
