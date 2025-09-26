// Entidad que representa un pedido en la lógica de negocio
class Order {

  // El constructor recibe un objeto con las propiedades del pedido
  constructor({ id, cliente, detalles, estado, createdAt }) {
    // Identificador único del pedido
    this.id = id;

    // Referencia al cliente que realizó el pedido
    this.cliente = cliente;

    // Arreglo de detalles del pedido (productos, cantidades, precios)
    this.detalles = detalles;

    // Estado actual del pedido (ej. activo, cancelado, entregado)
    this.estado = estado;

    // Fecha de creación del pedido
    this.createdAt = createdAt;
  }
}

// Exporta la clase Order para que pueda ser utilizada en otras partes del proyecto
export default Order;