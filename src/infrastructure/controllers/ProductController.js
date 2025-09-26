// Controlador que conecta las rutas con los casos de uso
class ProductController {
  constructor(createProduct, getProductById, getAllProducts, updateProduct, deleteProduct) {
    this.createProduct = createProduct;
    this.getProductById = getProductById;
    this.getAllProducts = getAllProducts;
    this.updateProduct = updateProduct;
    this.deleteProduct = deleteProduct;
  }

  async create(req, res) {
    try {
      const product = await this.createProduct.execute(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await this.getProductById.execute(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async get(req, res) {
    try {
      const products = await this.getAllProducts.execute();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const product = await this.updateProduct.execute(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await this.deleteProduct.execute(req.params.id);
      res.status(204).send(); // Sin contenido
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default ProductController;