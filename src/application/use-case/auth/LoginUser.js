import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Se importan las librerías necesarias:
// - 'bcryptjs': Para la comparación segura de contraseñas hasheadas.
// - 'jsonwebtoken' (jwt): Para la creación de JSON Web Tokens (JWT) para la sesión.

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
// La clase 'LoginUser' se define como un Caso de Uso.
// El 'constructor' recibe una instancia de 'userRepository', que es una dependencia.
// Este repositorio se espera que maneje las operaciones de acceso a datos de los usuarios.

  async execute({ email, password }) {
// El método 'execute' es el punto de entrada de la lógica de inicio de sesión.
// Es un método 'async' porque realiza operaciones asíncronas (acceso a DB y comparación bcrypt).
// Recibe un objeto con 'email' y 'password' como argumentos.

    const user = await this.userRepository.findByEmail(email);
// Intenta buscar al usuario en la base de datos (o donde persistan los datos)
// utilizando el 'email' proporcionado, a través del 'userRepository'.

    if (!user) throw new Error("Usuario no encontrado");
// Si 'user' es nulo o indefinido (no se encontró el usuario), lanza un error.

    const isMatch = await bcrypt.compare(password, user.password);
// Compara la 'password' proporcionada por el usuario con la contraseña hasheada
// almacenada en 'user.password' usando 'bcrypt.compare'. Esto es asíncrono y seguro.

    if (!isMatch) throw new Error("Contraseña incorrecta");
// Si la comparación 'bcrypt' resulta en 'false' (las contraseñas no coinciden), lanza un error.

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
      createdAt: user.createAt
    };
// Se define el 'payload' (carga útil) del JWT. Contiene información esencial del usuario
// que se incluirá en el token (ej: id, email, nombre, rol).

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
// Genera el JSON Web Token (JWT) usando:
// - El 'payload' definido.
// - Una clave secreta (`JWT_SECRET`) obtenida de las variables de entorno.
// - Opciones: Establece un tiempo de expiración (`expiresIn`), usando una variable de entorno
//   o por defecto 1 hora ('1h').

    const decoded = jwt.decode(token);
// Decodifica el token (sin verificar la firma, solo para inspeccionar el contenido)
// para obtener la información, especialmente la fecha de expiración.
    console.log("Token generado. Expira en:", new Date(decoded.exp * 1000).toLocaleString());
// Imprime en consola un mensaje con la fecha y hora de expiración del token,
// convirtiendo el valor 'exp' (en segundos) a milisegundos para crear un objeto 'Date'.

    return token;
// El método 'execute' finaliza devolviendo el token JWT generado,
// que el cliente usará para autenticar las peticiones futuras.
  }
}

export default LoginUser;
// Exporta la clase 'LoginUser' para que pueda ser utilizada en otras partes de la aplicación.