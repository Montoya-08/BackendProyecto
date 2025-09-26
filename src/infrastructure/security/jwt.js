const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET;
const expiresIn = '1h';

function generateToken(payload) {
  console.log("✅ Usando generateToken con payload:", payload);
  return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

export default { generateToken, verifyToken};