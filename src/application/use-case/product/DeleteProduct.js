// Caso de uso para eliminar un producto por ID
class DeleteProduct {

  // El constructor recibe una instancia del repositorio de productos
  constructor(productRepository) {
    // Se guarda la instancia del repositorio en una propiedad de la clase
    this.productRepository = productRepository;
  }

  // Método asincrónico que ejecuta la lógica de eliminación
  async execute(id) {
    // Verifica que el producto exista antes de eliminar
    const existing = await this.productRepository.getById(id);
    
    // Si no existe, lanza un error indicando que no se encontró el producto
    if (!existing) throw new Error('Producto no encontrado');

    // Elimina el producto usando el repositorio y retorna el resultado
    return await this.productRepository.delete(id);
  }
}

// Exporta la clase para que pueda ser utilizada en otras partes del proyecto
export default DeleteProduct;