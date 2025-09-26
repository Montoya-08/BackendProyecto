import ProductRepository from "../../../domain/repositories/ProductRepository.js";

class CreateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = new ProductRepository();
  }

  async execute(orderData) {
    const { cliente, detalles } = orderData;

    if (!cliente || !detalles || detalles.length === 0) {
      throw new Error('Cliente y detalles del pedido son obligatorios');
    }

    let total = 0;
    const detallesConPrecio = [];

    for (const item of detalles) {
      const producto = await this.productRepository.findById(item.productoId);
      if (!producto) throw new Error(`Producto no encontrado: ${item.productoId}`);

      const precioUnitario = producto.precio;
      const subtotal = item.cantidad * precioUnitario;
      total += subtotal;

      detallesConPrecio.push({
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal
      });
    }

    const order = {
      usuarioId: cliente,
      total,
      estado: 'activo',
      createdAt: new Date(),
      detalles: detallesConPrecio
    };

    const orderCreado = await this.orderRepository.create(order);

    return {
      message: 'Orden creada exitosamente',
      orderId: orderCreado._id,
      total
    };
  }
}

export default CreateOrder;