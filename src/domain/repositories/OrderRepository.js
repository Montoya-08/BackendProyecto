// infrastructure/repositories/OrderRepository.js
import OrderModel from '../../config/models/OrderModel.js';

class OrderRepository {
  async create(orderData) {
    try {
      // Validar datos mínimos
      if (!orderData.user || !orderData.details || !orderData.total) {
        throw new Error('Faltan datos requeridos: user, details o total');
      }
      const order = new OrderModel(orderData);
      const savedOrder = await order.save();
      console.log('Orden guardada en MongoDB:', savedOrder);
      return savedOrder;
    } catch (err) {
      console.error('Error al guardar orden:', err.message);
      throw new Error(`No se pudo guardar la orden: ${err.message}`);
    }
  }

  async getById(id) {
    try {
      return await OrderModel.findById(id)
        .populate('user') // Corregido de 'cliente' a 'user'
        .populate('details.productId'); // Corregido de 'detalles.productoId'
    } catch (err) {
      console.error('Error al obtener orden por ID:', err.message);
      throw new Error(`No se pudo obtener la orden: ${err.message}`);
    }
  }

  async get() {
    try {
      return await OrderModel.find()
        .populate('user') // Corregido de 'users' a 'user'
        .populate('details.productId'); // Corregido de 'detalls.productId'
    } catch (err) {
      console.error('Error al obtener órdenes:', err.message);
      throw new Error(`No se pudo obtener las órdenes: ${err.message}`);
    }
  }

  async cancel(id) {
    try {
      const cancelada = await OrderModel.findByIdAndUpdate(
        id,
        { status: 'cancelado' },
        { new: true }
      );
      if (!cancelada) {
        throw new Error('Orden no encontrada');
      }
      console.log('Orden cancelada:', cancelada);
      return cancelada;
    } catch (err) {
      console.error('Error al cancelar orden:', err.message);
      throw new Error(`No se pudo cancelar la orden: ${err.message}`);
    }
  }
}

export default OrderRepository;