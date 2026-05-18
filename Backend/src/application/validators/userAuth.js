import * as z from 'zod';

export const loginValidator = z.object({
    username: z.string().min(1, "El usuario es obligatorio").trim(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").trim()
});

export const registerValidator = z.object({
    username: z.string().min(1, "El usuario es obligatorio").trim(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").trim(),
    role: z.enum(["admin", "client"]).default("client"),
    associatedClientId: z.string().optional(),
    fullName: z.string().optional(),
    email: z.string().email("Debe ser un correo electrónico válido").optional()
});

export const updateUserValidator = z.object({
    fullName: z.string().optional(),
    email: z.string().email("Formato de correo inválido").optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres").optional()
});

export async function validateLogin(data) {
    return await loginValidator.parseAsync(data);
}

export async function validateRegister(data) {
    return await registerValidator.parseAsync(data);
}

export async function validateUpdateUser(data) {
    return await updateUserValidator.parseAsync(data);
}