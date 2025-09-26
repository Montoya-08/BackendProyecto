// Importa el modelo de producto desde la configuración de Mongoose
import ProductModel from "../../config/models/ProductModel.js";

// Repositorio que encapsula las operaciones de persistencia relacionadas con productos
class ProductRepository {

  // Método para crear un nuevo producto en la base de datos
  async create(productData) {
    // Crea una instancia del modelo con los datos recibidos
    const product = new ProductModel(productData);

    // Guarda el producto en MongoDB y retorna el resultado
    return await product.save();
  }

  // Método para obtener todos los productos
  async get() {
    // Retorna todos los documentos de la colección de productos
    return await ProductModel.find();
  }

  // Método para obtener un producto por su ID
  async getById(id) {
    // Busca y retorna el producto con el ID especificado
    return await ProductModel.findById(id);
  }

  // Método alternativo para obtener un producto por ID (usado por CreateOrder)
  async findById(id) {
    // Muestra en consola el ID que se está buscando
    console.log("Buscando producto:", id);

    // Busca y retorna el producto con el ID especificado
    return await ProductModel.findById(id);
  }

  // Método para actualizar un producto por su ID
  async update(id, data) {
    // Actualiza el producto con los nuevos datos y retorna el documento actualizado
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Método para eliminar un producto por su ID
  async delete(id) {
    // Elimina el producto y retorna el documento eliminado
    return await ProductModel.findByIdAndDelete(id);
  }
}

// Exporta el repositorio para que pueda ser utilizado en los casos de uso
export default ProductRepository;