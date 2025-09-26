// Caso de uso para obtener un producto por su ID
class GetProductById {
  
  // El constructor recibe una instancia del repositorio de productos
  constructor(productRepository) {
    // Se guarda la instancia del repositorio en una propiedad de la clase
    this.productRepository = productRepository;
  }

  // Método asincrónico que ejecuta la lógica de búsqueda
  async execute(id) {
    // Busca el producto en el repositorio usando el ID proporcionado
    const product = await this.productRepository.getById(id);

    // Si no existe el producto, lanza un error indicando que no fue encontrado
    if (!product) throw new Error('Producto no encontrado');

    // Retorna el producto encontrado
    return product;
  }
}

// Exporta la clase para que pueda ser utilizada en otras partes del proyecto
export default GetProductById;