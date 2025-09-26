// Caso de uso para crear un nuevo producto
class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    // Validación básica: nombre y precio son obligatorios
    if (!productData.nombre || productData.precio == null) {
      throw new Error('Nombre y precio son obligatorios');
    }

    // Llama al repositorio para guardar el producto
    return await this.productRepository.create(productData);
  }
}

export default CreateProduct;