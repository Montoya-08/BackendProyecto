// Caso de uso para cancelar un pedido
class UpdateOrder {
// La clase 'UpdateOrder' actúa como un Caso de Uso (Use Case).
// Su comentario inicial indica que su propósito real es 'cancelar un pedido'.

  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
// El constructor recibe una instancia de 'orderRepository' (repositorio de pedidos).
// Esta es la implementación del patrón Inyección de Dependencias,
// permitiendo que la lógica de negocio se separe del acceso a datos.

  async execute(id) {
// El método 'execute' es el punto de entrada de la lógica de negocio.
// Es un método 'async' ya que interactúa con el repositorio, lo cual es típicamente asíncrono.
// Recibe el 'id' del pedido que se desea cancelar.

    // Verifica que el pedido exista
    const existing = await this.orderRepository.getById(id);
// Primero, utiliza el repositorio para buscar el pedido por su 'id'.

    if (!existing) throw new Error('Pedido no encontrado');
// Si el resultado de la búsqueda es nulo o indefinido (el pedido no existe),
// lanza un error, impidiendo que la cancelación continúe.

    // Cancela el pedido
    return await this.orderRepository.cancel(id);
// Si el pedido existe, llama al método 'cancel' del repositorio,
// delegando la lógica de actualización del estado del pedido (a "cancelado") a la capa de persistencia.
// Retorna el resultado de esta operación (ej. el pedido actualizado o un booleano de éxito).
  }
}

export default UpdateOrder;
// Exporta la clase 'UpdateOrder' para que pueda ser utilizada por los controladores o servicios.