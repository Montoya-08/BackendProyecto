import express from "express";
import authMiddleware from "../../infrastructure/security/authMiddleware.js";

/**
 * Rutas protegidas para gestión de órdenes.
 * Requiere una instancia de OrderController.
 */
function orderRoutes(orderController) {
  const router = express.Router();

  // Obtener todas las órdenes
  router.get("/", authMiddleware, (req, res) => orderController.get(req, res));

  // Obtener una orden por ID
  router.get("/:id", authMiddleware, (req, res) => orderController.getById(req, res));

  // Crear una nueva orden
  router.post("/", authMiddleware, (req, res) => orderController.create(req, res));

  // Cancelar una orden
  router.put("/:id/cancel", authMiddleware, (req, res) => orderController.cancel(req, res));

  return router;
}

export default orderRoutes;