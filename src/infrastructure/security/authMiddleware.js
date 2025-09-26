// Importa la librería jsonwebtoken para verificar tokens JWT
import jwt from "jsonwebtoken";

// Middleware de autenticación que valida el token JWT en las solicitudes protegidas
function authMiddleware(req, res, next) {
  // Extrae el encabezado Authorization de la solicitud
  const authHeader = req.headers.authorization;

  // Verifica que el encabezado exista y comience con "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token faltante o mal formado" });
  }

  // Extrae el token eliminando la palabra "Bearer"
  const token = authHeader.split(" ")[1];

  try {
    // Verifica y decodifica el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Calcula la fecha de expiración del token en formato legible
    const expDate = new Date(decoded.exp * 1000);
    console.log(`Token válido. Expira en: ${expDate.toLocaleString()}`);

    // Adjunta los datos del usuario decodificado al objeto de la solicitud
    req.user = decoded;

    // Continúa con el siguiente middleware o controlador
    next();
  } catch (err) {
    // Si el token es inválido o ha expirado, responde con error 403
    console.error("Token inválido:", err.message);
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

// Exporta el middleware para que pueda ser usado en rutas protegidas
export default authMiddleware;