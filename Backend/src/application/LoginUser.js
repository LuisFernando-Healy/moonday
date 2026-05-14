import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateLogin } from './validators/userAuth.js';

export class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(credentials) {
    const { username, password } = await validateLogin(credentials);

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign(
        { id: user.id, role: user.role, clientId: user.associatedClientId }, 
        process.env.JWT_SECRET || 'token_secreto', 
        { expiresIn: "5h" }
    );

    return { 
        token, 
        user: { username: user.username, role: user.role, associatedClientId: user.associatedClientId } 
    };
  }
}