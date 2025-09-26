// Caso de uso para cancelar un pedido
class UpdateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id) {
    // Verifica que el pedido exista
    const existing = await this.orderRepository.getById(id);
    if (!existing) throw new Error('Pedido no encontrado');

    // Cancela el pedido
    return await this.orderRepository.cancel(id);
  }
}

export default UpdateOrder;