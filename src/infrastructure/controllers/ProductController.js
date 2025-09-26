// Controlador que conecta las rutas con los casos de uso
class ProductController {

  // El constructor recibe los casos de uso necesarios para operar sobre productos
  constructor(createProduct, getProductById, getAllProducts, updateProduct, deleteProduct) {
    this.createProduct = createProduct;       // Caso de uso para crear un producto
    this.getProductById = getProductById;     // Caso de uso para obtener un producto por ID
    this.getAllProducts = getAllProducts;     // Caso de uso para obtener todos los productos
    this.updateProduct = updateProduct;       // Caso de uso para actualizar un producto
    this.deleteProduct = deleteProduct;       // Caso de uso para eliminar un producto
  }

  // Crear un nuevo producto
  async create(req, res) {
    try {
      // Ejecuta el caso de uso con los datos del cuerpo de la solicitud
      const product = await this.createProduct.execute(req.body);

      // Responde con estado 201 y el producto creado
      res.status(201).json(product);
    } catch (err) {
      // Si hay error, responde con estado 400 y el mensaje
      res.status(400).json({ error: err.message });
    }
  }

  // Obtener un producto por su ID
  async getById(req, res) {
    try {
      // Ejecuta el caso de uso con el ID recibido por parámetro
      const product = await this.getProductById.execute(req.params.id);

      // Responde con el producto encontrado
      res.json(product);
    } catch (err) {
      // Si no se encuentra, responde con estado 404 y el mensaje
      res.status(404).json({ error: err.message });
    }
  }

  // Obtener todos los productos
  async get(req, res) {
    try {
      // Ejecuta el caso de uso para obtener todos los productos
      const products = await this.getAllProducts.execute();

      // Responde con la lista de productos
      res.json(products);
    } catch (err) {
      // Si hay error interno, responde con estado 500 y el mensaje
      res.status(500).json({ error: err.message });
    }
  }

  // Actualizar un producto por su ID
  async update(req, res) {
    try {
      // Ejecuta el caso de uso con el ID y los nuevos datos
      const product = await this.updateProduct.execute(req.params.id, req.body);

      // Responde con el producto actualizado
      res.json(product);
    } catch (err) {
      // Si hay error de validación, responde con estado 400 y el mensaje
      res.status(400).json({ error: err.message });
    }
  }

  // Eliminar un producto por su ID
  async delete(req, res) {
    try {
      // Ejecuta el caso de uso para eliminar el producto
      await this.deleteProduct.execute(req.params.id);

      // Responde con estado 204 (sin contenido)
      res.status(204).send();
    } catch (err) {
      // Si no se encuentra, responde con estado 404 y el mensaje
      res.status(404).json({ error: err.message });
    }
  }
}

// Exporta el controlador para que pueda ser utilizado en las rutas
export default ProductController;