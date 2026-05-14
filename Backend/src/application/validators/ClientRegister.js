
import * as z from 'zod';


export const  userValidator = z.object({

    id:z.string().optional(),
    name:z.string().min(3,"El nombre debe tener al menos 3 caracteres").trim(),
    lastname:z.string().min(5,"El apellido debe tener al menos 5 caracteres").trim(),
    reference:z.string().min(10,"La referencia debe tener al menos 10 caracteres").trim(),
    phone:z.string().length(10, { message: "El teléfono debe tener al menos 10 dígitos" }).regex(/^\d+$/, { message: "El teléfono debe contener solo números" }),
    active:z.boolean().optional(), });

export async function validateUser(clientdata) {

   
   return  await userValidator.parseAsync(clientdata);

}





