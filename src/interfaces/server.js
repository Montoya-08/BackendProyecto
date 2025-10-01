// Importa Express para crear el servidor y definir rutas
import express from "express";

// Importa dotenv para cargar variables de entorno desde el archivo .env
import dotenv from "dotenv";

// Importa cors para habilitar solicitudes entre orígenes
import cors from "cors"; // Nueva importación

// Importa las rutas de autenticación, productos y órdenes
import authRoutes from "../infrastructure/routes/authRoutes.js";
import productRoutes from "../infrastructure/routes/productRoutes.js";
import orderRoutes from "../infrastructure/routes/orderRoutes.js";

// Importa el controlador de órdenes y sus casos de uso
import OrderController from "../infrastructure/controllers/OrderController.js";
import CreateOrder from "../application/use-case/order/CreateOrder.js";
import CancelOrder from "../application/use-case/order/CancelOrder.js";
import GetOrderById from "../application/use-case/order/GetOrderById.js";
import GetOrders from "../application/use-case/order/GetOrders.js";

// Importa el repositorio de órdenes
import OrderRepository from "../domain/repositories/OrderRepository.js";

// Carga las variables de entorno
dotenv.config();

// Crea una instancia de la aplicación Express
const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: ['http://localhost:5173', 'https://synapsestock-4cdce.web.app'], // Permite solo el origen del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Instancia del repositorio de órdenes
const orderRepository = new OrderRepository();

// Instancia del caso de uso para obtener todas las órdenes
const getOrdersUseCase = new GetOrders(orderRepository);

// Instancia del controlador de órdenes con todos los casos de uso
const orderController = new OrderController(
  new CreateOrder(orderRepository),
  new CancelOrder(orderRepository),
  new GetOrderById(orderRepository),
  getOrdersUseCase
);

// Monta las rutas en la aplicación
app.use("/api/auth", authRoutes);           // Rutas de autenticación
app.use("/api/products", productRoutes);    // Rutas de productos
app.use("/api/orders", orderRoutes(orderController)); // Rutas de órdenes con controlador inyectado

// Exporta la aplicación para que pueda ser usada en el archivo principal (ej. server.js)
export default app;