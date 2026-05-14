import { userModel } from "../../infraestructure/database/Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(username, password) {
    const user = await userModel.findOne({ username });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (user.role !== "admin") {
      throw new Error("Acceso denegado: No tienes privilegios de administrador");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && password !== user.password) {
      throw new Error("Contraseña incorrecta");
    }
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