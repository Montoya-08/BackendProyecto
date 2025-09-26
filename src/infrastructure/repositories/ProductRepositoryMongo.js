const ProductModel = require('../../config/models/ProductModel.js');
const ProductRepository = require('../../domain/repositories/ProductRepository.js');

// Implementación del repositorio usando MongoDB y Mongoose
class ProductRepositoryMongo extends ProductRepository {
  async create(productData) {
    // Crea y guarda un nuevo producto en la base de datos
    const product = new ProductModel(productData);
    return await product.save();
  }

  async getById(id) {
    // Busca un producto por su ID
    return await ProductModel.findById(id);
  }

  async get() {
    // Devuelve todos los productos
    return await ProductModel.find();
  }

  async update(id, productData) {
    // Actualiza un producto por ID y devuelve el nuevo
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    // Elimina un producto por ID
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default ProductRepositoryMongo;