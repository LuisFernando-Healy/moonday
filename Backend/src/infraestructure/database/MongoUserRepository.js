import { userModel } from './Models/MongoUserModel.js';

export class MongoUserRepository {
  async save(userEntity) {
    try {
        const mongoUser = new userModel({
            username: userEntity.username,
            password: userEntity.password,
            role: userEntity.role,
            associatedClientId: userEntity.associatedClientId,
            fullName: userEntity.fullName,
            email: userEntity.email
        });
        return await mongoUser.save();
    } catch (error) {
        throw new Error(`Error al guardar usuario: ${error.message}`);
    }
  }

  async findByUsername(username) {
    try {
        return await userModel.findOne({ username });
    } catch (error) {
        throw new Error(`Error al buscar usuario: ${error.message}`);
    }
  }

  async update (username, updateData) {
    try {
        return await userModel.findOneAndUpdate({ username }, updateData, { new: true });
    } catch (error) {
        throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }
}