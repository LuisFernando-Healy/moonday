import { userModel } from './Models/MongoUserModel.js';

export class MongoUserRepository {
  async save(userEntity) {
    try {
        const mongoUser = new userModel({
            username: userEntity.username,
            password: userEntity.password,
            role: userEntity.role,
            associatedClientId: userEntity.associatedClientId
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
}