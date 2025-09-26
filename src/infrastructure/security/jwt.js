// Importa la librería jsonwebtoken para generar y verificar tokens JWT
const jwt = require('jsonwebtoken');

// Importa dotenv para acceder a variables de entorno
const dotenv = require('dotenv');
dotenv.config(); // Carga las variables desde el archivo .env

// Clave secreta para firmar los tokens, obtenida desde el entorno
const secret = process.env.JWT_SECRET;

// Tiempo de expiración del token (1 hora)
const expiresIn = '1h';

// Función para generar un token JWT con un payload personalizado
function generateToken(payload) {
  console.log("Usando generateToken con payload:", payload);

  // Firma el token con la clave secreta y tiempo de expiración
  return jwt.sign(payload, secret, { expiresIn });
}

// Función para verificar la validez de un token JWT
function verifyToken(token) {
  try {
    // Verifica y decodifica el token
    return jwt.verify(token, secret);
  } catch (err) {
    // Si el token es inválido o expiró, retorna null
    return null;
  }
}

// Exporta ambas funciones para que puedan ser utilizadas en otros módulos
export default { generateToken, verifyToken };