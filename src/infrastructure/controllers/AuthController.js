import LoginUser from "../../application/use-case/auth/LoginUser.js"; // ajusta la ruta si es distinta
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

class AuthController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // Registro de usuario
  async register(req, res) {
    const { nombre, email, password, rol } = req.body;

    try {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.userRepository.create({
        nombre,
        email,
        password: hashedPassword,
        rol,
      });

      return res.status(201).json({ message: "Usuario registrado", user: newUser });
    } catch (error) {
      console.error("❌ Error en registro:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // Login usando LoginUser
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const loginUser = new LoginUser(this.userRepository);
      const token = await loginUser.execute({ email, password });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("❌ Error en login:", error);
      return res.status(401).json({ error: error.message });
    }
  }
}

export default AuthController;