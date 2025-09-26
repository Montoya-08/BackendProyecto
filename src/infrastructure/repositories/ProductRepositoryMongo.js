// Importa el modelo de producto desde la configuración de Mongoose
const ProductModel = require('../../config/models/ProductModel.js');

// Importa la interfaz base del repositorio de productos
const ProductRepository = require('../../domain/repositories/ProductRepository.js');

// Implementación del repositorio usando MongoDB y Mongoose
class ProductRepositoryMongo extends ProductRepository {

  // Método para crear un nuevo producto
  async create(productData) {
    // Crea y guarda un nuevo producto en la base de datos
    const product = new ProductModel(productData);
    return await product.save();
  }

  // Método para obtener un producto por su ID
  async getById(id) {
    // Busca un producto por su ID
    return await ProductModel.findById(id);
  }

  // Método para obtener todos los productos
  async get() {
    // Devuelve todos los productos
    return await ProductModel.find();
  }

  // Método para actualizar un producto por su ID
  async update(id, productData) {
    // Actualiza un producto por ID y devuelve el nuevo
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  // Método para eliminar un producto por su ID
  async delete(id) {
    // Elimina un producto por ID
    return await ProductModel.findByIdAndDelete(id);
  }
}

// Exporta el repositorio para que pueda ser utilizado en los casos de uso
export default ProductRepositoryMongo;