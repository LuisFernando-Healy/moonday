export class DeleteClient {
    constructor(clientrepository,socketservice){
        this.clientrepository = clientrepository;
        this.socketservice = socketservice;

    }

    async execute(id,locality){

        

            if(!id || !locality){
            throw new Error ("EL Id y la localidad deben de ser obligarotorias")}

             const deletedclient = await this.clientrepository.delete(id,locality);
             this.socketservice.notify(`Cliente eliminado ${locality.toUpperCase()}`,deletedclient)

             return {
                 deleted: true,
                 id
            };
    }
}