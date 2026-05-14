
import * as z from 'zod';


export const  userValidator = z.object({
    id:z.string().optional(),

    clienteId: z.string().min(1, "El Folio (clienteId) es obligatorio").trim(),
    paquete: z.string().min(1, "El paquete es obligatorio").trim(),
    montoMensual: z.number().positive("El monto debe ser un número positivo"),
    diaDeCorte: z.number().min(1).max(31).optional().default(5),

    name:z.string().min(3,"El nombre debe tener al menos 3 caracteres").trim(),
    lastname:z.string().min(5,"El apellido debe tener al menos 5 caracteres").trim(),
    reference:z.string().min(10,"La referencia debe tener al menos 10 caracteres").trim(),
    phone:z.string().length(10, { message: "El teléfono debe tener al menos 10 dígitos" }).regex(/^\d+$/, { message: "El teléfono debe contener solo números" }),
    active:z.boolean().optional(), });

export async function validateUser(clientdata) {
   return  await userValidator.parseAsync(clientdata);

}