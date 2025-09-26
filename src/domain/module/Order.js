// Entidad que representa un pedido en la lógica de negocio
class Order {
  constructor({ id, cliente, detalles, estado, createdAt }) {
    this.id = id;
    this.cliente = cliente;
    this.detalles = detalles;
    this.estado = estado;
    this.createdAt = createdAt;
  }
}

export default Order;