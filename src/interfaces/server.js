import express from "express";
import dotenv from "dotenv";

// Rutas
import authRoutes from "../infrastructure/routes/authRoutes.js";
import productRoutes from "../infrastructure/routes/productRoutes.js";
import orderRoutes from "../infrastructure/routes/orderRoutes.js";

// Controlador y casos de uso
import OrderController from "../infrastructure/controllers/OrderController.js";
import CreateOrder from "../application/use-case/order/CreateOrder.js";
import CancelOrder from "../application/use-case/order/CancelOrder.js";
import GetOrderById from "../application/use-case/order/GetOrderById.js";
import GetOrders from "../application/use-case/order/GetOrders.js";

// Repositorio
import OrderRepository from "../domain/repositories/OrderRepository.js";

dotenv.config();
const app = express();
app.use(express.json());

const orderRepository = new OrderRepository();

const getOrdersUseCase = new GetOrders(orderRepository);

const orderController = new OrderController(
  new CreateOrder(orderRepository),
  new CancelOrder(orderRepository),
  new GetOrderById(orderRepository),
  getOrdersUseCase
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes(orderController));

export default app;