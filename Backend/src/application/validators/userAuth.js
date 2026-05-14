import * as z from 'zod';

export const loginValidator = z.object({
    username: z.string().min(1, "El usuario es obligatorio").trim(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").trim()
});

export const registerValidator = z.object({
    username: z.string().min(1, "El usuario es obligatorio").trim(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").trim(),
    role: z.enum(["admin", "client"]).default("client"),
    associatedClientId: z.string().optional()
});

export async function validateLogin(data) {
    return await loginValidator.parseAsync(data);
}

export async function validateRegister(data) {
    return await registerValidator.parseAsync(data);
}