import ProductModel from "../../config/models/ProductModel.js";
class ProductRepository {
  async create(productData) {
    const product = new ProductModel(productData);
    return await product.save();
  }

  // Puedes agregar otros métodos como:
  async get() {
    return await ProductModel.find();
  }

  async getById(id) {
    return await ProductModel.findById(id);
  }

  async findById(id) { // ✅ Este método es el que espera CreateOrder
    console.log("🔎 Buscando producto:", id);
    return await ProductModel.findById(id);
  }


  async update(id, data) {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default ProductRepository;