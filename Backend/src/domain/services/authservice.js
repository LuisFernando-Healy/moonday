import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 


export class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register({ username, password, role, associatedClientId }) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Usamos el repositorio en lugar de userModel directo
        const newUser = await this.userRepository.save({
            username,
            password: hashedPassword,
            role,
            associatedClientId
        });
        
        return { 
            id: newUser._id,  
            username: newUser.username, 
            password: newUser.password,
            role: newUser.role 
        };
    }

    async login({ username, password }) {
        const user = await this.userRepository.findByUsername(username);

        if(!user){
            throw new Error('Usuario no encontrado');
        }

        const isValidPassword = await bcrypt.compare(password, user.password); 
        if(!isValidPassword){
            throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign({
            id: user._id, 
            role: user.role, 
            clientId: user.associatedClientId
        }, process.env.JWT_SECRET || 'token secreto', {
            expiresIn: "5h"
        });

        return {
            token, 
            user: {
                username: user.username, 
                password: user.password,
                role: user.role, 
                associatedClientId: user.associatedClientId
            }
        };
    }
}