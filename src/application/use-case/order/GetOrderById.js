class GetOrderById {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
// La clase 'GetOrderById' es un Caso de Uso.
// El 'constructor' recibe una instancia de 'orderRepository'.
// Esta es la dependencia inyectada, que proporciona los métodos de acceso a datos para los pedidos.

  async execute(id) {
// El método 'execute' es el punto de entrada de la lógica (o en este caso, la delegación).
// Es 'async' ya que la operación de acceso a datos suele ser asíncrona.
// Recibe el 'id' (identificador) del pedido que se desea recuperar.

    return await this.orderRepository.getById(id);
// Delega la responsabilidad de buscar el pedido al repositorio.
// Llama al método 'getById' del 'orderRepository', pasándole el 'id'.
// Retorna directamente el resultado de esta operación (el objeto del pedido o null/undefined si no se encuentra).
  }
}

export default GetOrderById;
// Exporta la clase para que pueda ser utilizada por la capa de presentación (ej. un controlador).