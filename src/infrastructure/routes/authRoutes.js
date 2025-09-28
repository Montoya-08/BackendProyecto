// infrastructure/routes/authRoutes.js
import express from 'express';
import AuthController from '../../infrastructure/controllers/AuthController.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const router = express.Router();
const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

// Conectar a MongoDB (eliminar si está en AuthController)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Ruta para login de usuario
router.post('/login', (req, res) => authController.login(req, res));

// Ruta para registro de usuario
router.post('/register', (req, res) => authController.register(req, res));

// Endpoint para obtener usuarios
router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await userRepository.findAll();
    console.log('Usuarios enviados:', users); // Log para depurar
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

export default router;