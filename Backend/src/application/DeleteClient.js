export class DeleteClient {
    constructor(clientrepository,socketservice){
        this.clientrepository = clientrepository;
        this.socketservice = socketservice;

    }

    async execute(clienteId,locality){

        

            if(!clienteId || !locality){
            throw new Error ("EL Id y la localidad deben de ser obligarotorias")}

             const deletedclient = await this.clientrepository.delete(clienteId,locality);
             this.socketservice.notify(`Cliente eliminado ${locality.toUpperCase()}`,deletedclient)

             return {
                 deleted: true,
                 clienteId
            };
    }
}