import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const payload = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    const decoded = jwt.decode(token);
    console.log("🕒 Token generado. Expira en:", new Date(decoded.exp * 1000).toLocaleString());

    return token;
  }
}

export default LoginUser;