// Caso de uso para actualizar un producto por ID
class UpdateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, productData) {
    // Verifica que el producto exista antes de actualizar
    const existing = await this.productRepository.getById(id);
    if (!existing) throw new Error('Producto no encontrado');

    // Actualiza el producto y devuelve el nuevo
    return await this.productRepository.update(id, productData);
  }
}

export default UpdateProduct;