// Caso de uso para eliminar un producto por ID
class DeleteProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    // Verifica que el producto exista antes de eliminar
    const existing = await this.productRepository.getById(id);
    if (!existing) throw new Error('Producto no encontrado');

    // Elimina el producto
    return await this.productRepository.delete(id);
  }
}

export default DeleteProduct;