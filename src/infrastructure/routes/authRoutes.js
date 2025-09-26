import express from "express";
import AuthController from "../../infrastructure/controllers/AuthController.js";
import UserRepository from "../../domain/repositories/UserRepository.js";

const router = express.Router();
const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

router.post("/login", (req, res) => authController.login(req, res));
router.post("/register", (req, res) => authController.register(req, res));

export default router;