// Caso de uso para crear un nuevo producto
class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
// La clase 'CreateProduct' se establece como un Caso de Uso.
// El 'constructor' recibe y asigna la dependencia 'productRepository'.
// Este repositorio es la interfaz para las operaciones de persistencia de productos.

  async execute(productData) {
// El método 'execute' es el punto de entrada para crear el producto.
// Es 'async' para manejar la comunicación asíncrona con el repositorio/base de datos.
// Recibe un objeto 'productData' que contiene los datos del producto (nombre, precio, etc.).

    // Validación básica: nombre y precio son obligatorios
    if (!productData.nombre || productData.precio == null) {
      throw new Error('Nombre y precio son obligatorios');
    }
// Realiza una validación de reglas de negocio: asegura que el 'nombre' sea un valor verdadero
// y que el 'precio' no sea nulo ni indefinido (permitiendo 0). Si falla, lanza un error.

    // Llama al repositorio para guardar el producto
    return await this.productRepository.create(productData);
// Delega la tarea de guardar el producto al 'productRepository' inyectado,
// pasándole los datos ya validados.
// Retorna el resultado de la operación de creación (ej., el producto con su ID asignado).
  }
}

export default CreateProduct;
// Exporta la clase 'CreateProduct' para que pueda ser utilizada por los controladores.