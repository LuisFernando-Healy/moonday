export class GetUserProfile {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(username) {
    const user = await this.userRepository.findByUsername(username);
    
    if (!user) throw new Error("Usuario no encontrado");

    return {
      username: user.username,
      role: user.role,
      fullName: user.fullName,
      email: user.email
    };
  }
}