// Caso de uso para obtener todos los productos
class GetProducts {

  // El constructor recibe una instancia del repositorio de productos
  constructor(productRepository) {
    // Se guarda la instancia del repositorio en una propiedad de la clase
    this.productRepository = productRepository;
  }

  // Método asincrónico que ejecuta la lógica de obtención
  async execute() {
    // Llama al repositorio para obtener todos los productos
    return await this.productRepository.get();
  }
}

// Exporta la clase para que pueda ser utilizada en otras partes del proyecto
export default GetProducts;