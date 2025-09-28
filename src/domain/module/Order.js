// Entidad que representa un pedido en la lógica de negocio
class Order {

  // El constructor recibe un objeto con las propiedades del pedido
  constructor({ id, user, details, status, createdAt }) {
    // Identificador único del pedido
    this.id = id;

    // Referencia al cliente que realizó el pedido
    this.user = user;

    // Arreglo de detalles del pedido (productos, cantidades, precios)
    this.details = details;

    // Estado actual del pedido (ej. activo, cancelado, entregado)
    this.status = status;

    // Fecha de creación del pedido
    this.createdAt = createdAt;
  }
}

// Exporta la clase Order para que pueda ser utilizada en otras partes del proyecto
export default Order;