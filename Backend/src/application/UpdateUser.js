import { validateUpdateUser } from "./validators/userAuth.js";
import bcrypt from "bcrypt";

export class UpdateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(username, updateData) {
        const valiData = await validateUpdateUser(updateData);
        const user = await this.userRepository.findByUsername(username);
        if(!user) {
            throw new Error("Usuario no encontrado");
        }

        const updatePayLoad = {
            fullName: valiData.fullName || user.fullName,
            email: valiData.email || user.email
        };

        if(valiData.newPassword) {
            if(!valiData.currentPassword) {
                throw new Error("La contraseña actual es requerida para cambiar la contraseña");
            }
            const isPasswordCorrect = await bcrypt.compare(valiData.currentPassword, user.password);
            if(!isPasswordCorrect) {
                throw new Error("La contraseña actual es incorrecta");
            }
            updatePayLoad.password = await bcrypt.hash(valiData.newPassword, 10);
        }

        const updatedUser = await this.userRepository.update(username, updatePayLoad);

        return {
            username: updatedUser.username,
            role: updatedUser.role,
            fullName: updatedUser.fullName,
            email: updatedUser.email
        }
    }
}