// Importa Express para definir rutas HTTP
import express from "express";

// Importa el controlador de autenticación
import AuthController from "../../infrastructure/controllers/AuthController.js";

// Importa el repositorio de usuarios
import UserRepository from "../../domain/repositories/UserRepository.js";

// Crea una instancia del router de Express
const router = express.Router();

// Instancia el repositorio de usuarios
const userRepository = new UserRepository();

// Instancia el controlador de autenticación con el repositorio
const authController = new AuthController(userRepository);

// Ruta para login de usuario
router.post("/login", (req, res) => authController.login(req, res));

// Ruta para registro de usuario
router.post("/register", (req, res) => authController.register(req, res));

// Exporta el router para que pueda ser usado en el archivo principal de rutas
export default router;