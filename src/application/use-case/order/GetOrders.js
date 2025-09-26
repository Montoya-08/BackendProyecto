class GetOrders {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
// La clase 'GetOrders' es un Caso de Uso (Use Case).
// El 'constructor' recibe e inyecta la dependencia 'orderRepository'.
// Este repositorio contiene la lógica para acceder a los datos de los pedidos.

  async execute() {
// El método 'execute' es el punto de entrada para ejecutar la acción.
// Es 'async' porque la obtención de datos es una operación asíncrona.

    return await this.orderRepository.get();
// Delega completamente la tarea de obtener la lista de pedidos al repositorio inyectado.
// Se espera que el método 'get()' del repositorio devuelva una colección (array) de todos los pedidos.
// El resultado de esta llamada es retornado directamente por el Caso de Uso.
  }
}

export default GetOrders;
// Exporta la clase 'GetOrders' para ser utilizada en la aplicación.