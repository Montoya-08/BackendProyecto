import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token faltante o mal formado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expDate = new Date(decoded.exp * 1000);
    console.log(`✅ Token válido. Expira en: ${expDate.toLocaleString()}`);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token inválido:", err.message);
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

export default authMiddleware;