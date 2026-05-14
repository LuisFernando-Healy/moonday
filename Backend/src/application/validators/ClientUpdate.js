import { userValidator } from "./ClientRegister.js";

export const partialvalidateUser = userValidator.partial();


export async function validateClientUpdate(clientdata) {

        
   return await partialvalidateUser.parseAsync(clientdata);

   
}