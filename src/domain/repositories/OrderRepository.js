import OrderModel from '../../config/models/OrderModel.js';
class OrderRepository {
  async create(orderData) {
    try {
      const order = new OrderModel(orderData);
      const savedOrder = await order.save();
      console.log("✅ Orden guardada en MongoDB:", savedOrder);
      return savedOrder;
    } catch (err) {
      console.error("❌ Error al guardar orden:", err.message);
      throw new Error("No se pudo guardar la orden");
    }
  }

  async getById(id) {
    try {
      return await OrderModel.findById(id)
        .populate('cliente') // ← este campo debe existir en el modelo
        .populate('detalles.productoId'); // ← este también
    } catch (err) {
      console.error("❌ Error al obtener orden por ID:", err.message);
      throw new Error("No se pudo obtener la orden");
    }
  }


  async get() {
    return await OrderModel.find()
      .populate('cliente')
      .populate('detalles.productoId');
  }

  async cancel(id) {
    try {
      const cancelada = await OrderModel.findByIdAndUpdate(
        id,
        { estado: 'cancelado' },
        { new: true }
      );
      console.log("🛑 Orden cancelada:", cancelada);
      return cancelada;
    } catch (err) {
      console.error("❌ Error al cancelar orden:", err.message);
      throw new Error("No se pudo cancelar la orden");
    }
  }
}

export default OrderRepository;