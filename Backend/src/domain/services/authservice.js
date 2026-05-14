import { userModel } from "../../infraestructure/database/Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(username, password) {
    // 1. Buscamos al usuario en MongoDB
    const user = await userModel.findOne({ username });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // 2. Verificamos que tenga el rol adecuado
    if (user.role !== "admin") {
      throw new Error("Acceso denegado: No tienes privilegios de administrador");
    }

    // 3. Verificamos la contraseña
    // Nota: bcrypt compara la contraseña encriptada. Agrego un 'fallback' temporal 
    // por si creaste el usuario a mano en la base de datos sin encriptar.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && password !== user.password) {
      throw new Error("Contraseña incorrecta");
    }

    // 4. Generamos el Token de sesión (JWT) válido por 8 horas
    // Usa una clave secreta de tu .env, o usa esta por defecto
    const secret = process.env.JWT_SECRET || "secreto_super_seguro_admin_it";
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      secret,
      { expiresIn: "8h" }
    );

    // Retornamos el token y los datos limpios
    return { 
      token, 
      usuario: { 
        id: user._id, 
        username: user.username, 
        role: user.role 
      } 
    };
  }
}