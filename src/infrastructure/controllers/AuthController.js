// Importa el caso de uso para login de usuario
import LoginUser from "../../application/use-case/auth/LoginUser.js"; // ajusta la ruta si es distinta

// Importa bcrypt para encriptar contraseñas
import bcrypt from "bcryptjs";

// Importa y configura dotenv para acceder a variables de entorno
import dotenv from "dotenv";
dotenv.config();

// Controlador de autenticación que maneja registro y login
class AuthController {

  // El constructor recibe el repositorio de usuarios
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // Registro de usuario
  async register(req, res) {
    // Extrae los datos del cuerpo de la solicitud
    const { nombre, email, password, rol } = req.body;

    try {
      // Verifica si el usuario ya existe por su email
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        // Si ya existe, responde con error 400
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      // Encripta la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crea el nuevo usuario en la base de datos
      const newUser = await this.userRepository.create({
        nombre,
        email,
        password: hashedPassword,
        rol,
      });

      // Responde con éxito y el usuario creado
      return res.status(201).json({ message: "Usuario registrado", user: newUser });
    } catch (error) {
      // Muestra el error en consola y responde con error 500
      console.error("Error en registro:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // Login usando el caso de uso LoginUser
  async login(req, res) {
    // Extrae las credenciales del cuerpo de la solicitud
    const { email, password } = req.body;

    try {
      // Instancia el caso de uso de login con el repositorio
      const loginUser = new LoginUser(this.userRepository);

      // Ejecuta el login y obtiene el token
      const token = await loginUser.execute({ email, password });

      // Responde con el token si el login fue exitoso
      return res.status(200).json({ token });
    } catch (error) {
      // Muestra el error en consola y responde con error 401
      console.error("Error en login:", error);
      return res.status(401).json({ error: error.message });
    }
  }
}

// Exporta el controlador para que pueda ser utilizado en las rutas
export default AuthController;