// Importa Express para definir rutas HTTP
import express from "express";

// Importa el controlador de usuarios
import UserController from "../../infrastructure/controllers/UserController.js";

// Importa los casos de uso relacionados con usuarios
import CreateUser from "../../application/use-case/user/CreateUser.js";
import GetUserById from "../../application/use-case/user/GetUserById.js";
import GetUsers from "../../application/use-case/user/GetUsers.js";
import UpdateUser from "../../application/use-case/user/UpdateUser.js";
import DeleteUser from "../../application/use-case/user/DeleteUser.js";

// Importa el repositorio de usuarios
import UserRepository from "../../domain/repositories/UserRepository.js";

// Importa el middleware de autenticación para proteger las rutas
import authMiddleware from "../security/authMiddleware.js";

// Importa el middleware de roles para restringir acceso según el rol
import roleMiddleware from "../../infrastructure/security/roleMiddleware.js";

// Crea una instancia del router de Express
const router = express.Router();

// Instancia del repositorio que será usado por los casos de uso
const userRepository = new UserRepository();

// Instancia de cada caso de uso con el repositorio inyectado
const createUser = new CreateUser(userRepository);
const getUserById = new GetUserById(userRepository);
const getUsers = new GetUsers(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

// Instancia del controlador con todos los casos de uso
const userController = new UserController(
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
);

// Rutas protegidas por autenticación y roles

// Crear un nuevo usuario (solo admin)
router.post("/", authMiddleware, roleMiddleware(["admin"]), (req, res) => userController.create(req, res));

// Obtener todos los usuarios (requiere autenticación)
router.get("/", authMiddleware, (req, res) => userController.get(req, res));

// Obtener un usuario por ID (requiere autenticación)
router.get("/:id", authMiddleware, (req, res) => userController.getById(req, res));

// Actualizar un usuario por ID (requiere autenticación)
router.put("/:id", authMiddleware, (req, res) => userController.update(req, res));

// Eliminar un usuario por ID (requiere autenticación)
router.delete("/:id", authMiddleware, (req, res) => userController.delete(req, res));

// Exporta el router para que pueda ser montado en el servidor principal
export default router;