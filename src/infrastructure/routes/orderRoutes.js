// Importa Express para definir rutas HTTP
import express from "express";

// Importa el middleware de autenticación para proteger las rutas
import authMiddleware from "../../infrastructure/security/authMiddleware.js";

/**
 * Rutas protegidas para gestión de órdenes.
 * Requiere una instancia de OrderController.
 */
function orderRoutes(orderController) {
  // Crea una instancia del router de Express
  const router = express.Router();

  // Ruta para obtener todas las órdenes (requiere autenticación)
  router.get("/", authMiddleware, (req, res) => orderController.get(req, res));

  // Ruta para obtener una orden específica por ID (requiere autenticación)
  router.get("/:id", authMiddleware, (req, res) => orderController.getById(req, res));

  // Ruta para crear una nueva orden (requiere autenticación)
  router.post("/", authMiddleware, (req, res) => orderController.create(req, res));

  // Ruta para cancelar una orden por ID (requiere autenticación)
  router.put("/:id/cancel", authMiddleware, (req, res) => orderController.cancel(req, res));

  // Retorna el router configurado
  return router;
}

// Exporta el conjunto de rutas para que pueda ser usado en el archivo principal
export default orderRoutes;