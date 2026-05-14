import bcrypt from 'bcryptjs';
import { validateRegister } from './validators/userAuth.js';
import { User } from '../domain/entities/user.js';

export class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const cleanData = await validateRegister(userData);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cleanData.password, salt);

    const userEntity = new User({
        ...cleanData,
        password: hashedPassword
    });

    const savedUser = await this.userRepository.save(userEntity);
    
    return { id: savedUser.id, username: savedUser.username, role: savedUser.role };
  }
}