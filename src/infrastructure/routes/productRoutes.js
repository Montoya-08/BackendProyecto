// Importa Express para definir rutas HTTP
import express from "express";

// Importa el controlador de productos
import ProductController from "../../infrastructure/controllers/ProductController.js";

// Importa los casos de uso relacionados con productos
import CreateProduct from "../../application/use-case/product/CreateProduct.js";
import GetProductById from "../../application/use-case/product/GetProductById.js";
import GetProducts from "../../application/use-case/product/GetProducts.js";
import UpdateProduct from "../../application/use-case/product/UpdateProduct.js";
import DeleteProduct from "../../application/use-case/product/DeleteProduct.js";

// Importa el repositorio de productos
import ProductRepository from "../../domain/repositories/ProductRepository.js";

// Importa el middleware de autenticación para proteger las rutas
import authMiddleware from "../security/authMiddleware.js";

// Crea una instancia del router de Express
const router = express.Router();

// Instancia del repositorio que será usado por los casos de uso
const productRepository = new ProductRepository();

// Instancia de cada caso de uso con el repositorio inyectado
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

// Rutas protegidas por el middleware de autenticación

// Obtener todos los productos
router.get("/", authMiddleware, (req, res) => productController.get(req, res));

// Crear un nuevo producto
router.post("/", authMiddleware, (req, res) => productController.create(req, res));

// Obtener un producto por ID
router.get("/:id", authMiddleware, (req, res) => productController.getById(req, res));

// Actualizar un producto por ID
router.put("/:id", authMiddleware, (req, res) => productController.update(req, res));

// Eliminar un producto por ID
router.delete("/:id", authMiddleware, (req, res) => productController.delete(req, res));

// Exporta el router para que pueda ser montado en el servidor principal
export default router;