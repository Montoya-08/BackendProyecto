import express from "express";
import ProductController from "../../infrastructure/controllers/ProductController.js";
import CreateProduct from "../../application/use-case/product/CreateProduct.js";
import GetProductById from "../../application/use-case/product/GetProductById.js";
import GetProducts from "../../application/use-case/product/GetProducts.js";
import UpdateProduct from "../../application/use-case/product/UpdateProduct.js";
import DeleteProduct from "../../application/use-case/product/DeleteProduct.js";
import ProductRepository from "../../domain/repositories/ProductRepository.js";
import authMiddleware from "../security/authMiddleware.js";

const router = express.Router();

// Instancia del repositorio
const productRepository = new ProductRepository();

// Instancia de casos de uso
const createProduct = new CreateProduct(productRepository);
const getProductById = new GetProductById(productRepository);
const getProducts = new GetProducts(productRepository);
const updateProduct = new UpdateProduct(productRepository);
const deleteProduct = new DeleteProduct(productRepository);

// Instancia del controlador con todos los casos de uso
const productController = new ProductController(
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct
);

// Rutas protegidas
router.get("/", authMiddleware, (req, res) => productController.get(req, res));
router.post("/", authMiddleware, (req, res) => productController.create(req, res));
router.get("/:id", authMiddleware, (req, res) => productController.getById(req, res));
router.put("/:id", authMiddleware, (req, res) => productController.update(req, res));
router.delete("/:id", authMiddleware, (req, res) => productController.delete(req, res));

export default router;