const OrderModel = require('../../config/models/OrderModel.js');
const OrderRepository = require('../../domain/repositories/OrderRepository.js');
const ProductRepository = require('./ProductRepository.js');

class OrderRepositoryMongo extends OrderRepository {
  constructor() {
    super();
    this.productRepository = new ProductRepository();
  }

  async create(orderData) {
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

    const order = new OrderModel({
      usuarioId: cliente,
      total,
      estado: 'activo',
      createdAt: new Date(),
      detalles: detallesConPrecio
    });

    return await order.save();
  }

  async getById(id) {
    return await OrderModel.findById(id).populate('usuarioId');
  }

  async get() {
    return await OrderModel.find().populate('usuarioId');
  }

  async cancel(id) {
    return await OrderModel.findByIdAndUpdate(id, { estado: 'cancelado' }, { new: true });
  }
}

export default OrderRepositoryMongo;