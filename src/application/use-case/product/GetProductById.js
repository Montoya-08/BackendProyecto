// Caso de uso para obtener un producto por su ID
class GetProductById {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    // Busca el producto en el repositorio
    const product = await this.productRepository.getById(id);

    // Si no existe, lanza error
    if (!product) throw new Error('Producto no encontrado');

    return product;
  }
}

export default GetProductById;