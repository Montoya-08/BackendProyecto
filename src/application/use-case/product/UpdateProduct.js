// Caso de uso para actualizar un producto por ID
class UpdateProduct {

  // El constructor recibe una instancia del repositorio de productos
  constructor(productRepository) {
    // Se guarda la instancia del repositorio en una propiedad de la clase
    this.productRepository = productRepository;
  }

  // Método asincrónico que ejecuta la lógica de actualización
  async execute(id, productData) {
    // Verifica que el producto exista antes de actualizar
    const existing = await this.productRepository.getById(id);

    // Si no existe, lanza un error indicando que no se encontró el producto
    if (!existing) throw new Error('Producto no encontrado');

    // Actualiza el producto con los nuevos datos y retorna el resultado
    return await this.productRepository.update(id, productData);
  }
}

// Exporta la clase para que pueda ser utilizada en otras partes del proyecto
export default UpdateProduct;