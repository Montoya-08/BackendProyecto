import bcrypt from 'bcryptjs';

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const existing = await this.userRepository.findByEmail(userData.email);
    if (existing) throw new Error('Email ya registrado');

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      nombre: userData.nombre,
      email: userData.email,
      password: hashedPassword,
      rol: userData.rol
    };

    return await this.userRepository.create(newUser);
  }
}

export default RegisterUser;