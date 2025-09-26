import express from "express";
import UserController from "../../infrastructure/controllers/UserController.js";
import CreateUser from "../../application/use-case/user/CreateUser.js";
import GetUserById from "../../application/use-case/user/GetUserById.js";
import GetUsers from "../../application/use-case/user/GetUsers.js";
import UpdateUser from "../../application/use-case/user/UpdateUser.js";
import DeleteUser from "../../application/use-case/user/DeleteUser.js";
import UserRepository from "../../domain/repositories/UserRepository.js";
import authMiddleware from "../security/authMiddleware.js";
import roleMiddleware from "../../infrastructure/security/roleMiddleware.js";

const router = express.Router();
const userRepository = new UserRepository();

const createUser = new CreateUser(userRepository);
const getUserById = new GetUserById(userRepository);
const getUsers = new GetUsers(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

const userController = new UserController(
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
);

// Rutas protegidas
router.post("/", authMiddleware, roleMiddleware(["admin"]), (req, res) => userController.create(req, res));
router.get("/", authMiddleware, (req, res) => userController.get(req, res));
router.get("/:id", authMiddleware, (req, res) => userController.getById(req, res));
router.put("/:id", authMiddleware, (req, res) => userController.update(req, res));
router.delete("/:id", authMiddleware, (req, res) => userController.delete(req, res));

export default router;