// Caso de uso para obtener todos los productos
class GetProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    // Llama al repositorio para obtener todos los productos
    return await this.productRepository.get();
  }
}

export default GetProducts;