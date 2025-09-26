// Importa el modelo de orden desde la configuración de Mongoose
import OrderModel from '../../config/models/OrderModel.js';

// Repositorio que encapsula las operaciones de persistencia relacionadas con órdenes
class OrderRepository {

  // Método para crear una nueva orden en la base de datos
  async create(orderData) {
    try {
      // Crea una instancia del modelo con los datos recibidos
      const order = new OrderModel(orderData);

      // Guarda la orden en MongoDB
      const savedOrder = await order.save();

      // Muestra en consola la orden guardada
      console.log("Orden guardada en MongoDB:", savedOrder);

      // Retorna la orden guardada
      return savedOrder;
    } catch (err) {
      // Muestra el error en consola si ocurre al guardar
      console.error("Error al guardar orden:", err.message);

      // Lanza un error personalizado para la capa superior
      throw new Error("No se pudo guardar la orden");
    }
  }

  // Método para obtener una orden por su ID
  async getById(id) {
    try {
      // Busca la orden por ID y hace populate de cliente y productoId en los detalles
      return await OrderModel.findById(id)
        .populate('cliente') // ← este campo debe existir en el modelo
        .populate('detalles.productoId'); // ← este también
    } catch (err) {
      // Muestra el error en consola si ocurre al buscar
      console.error("Error al obtener orden por ID:", err.message);

      // Lanza un error personalizado para la capa superior
      throw new Error("No se pudo obtener la orden");
    }
  }

  // Método para obtener todas las órdenes
  async get() {
    // Busca todas las órdenes y hace populate de cliente y productoId en los detalles
    return await OrderModel.find()
      .populate('cliente')
      .populate('detalles.productoId');
  }

  // Método para cancelar una orden por su ID
  async cancel(id) {
    try {
      // Actualiza el estado de la orden a "cancelado" y retorna la versión actualizada
      const cancelada = await OrderModel.findByIdAndUpdate(
        id,
        { estado: 'cancelado' },
        { new: true } // ← retorna el documento actualizado
      );

      // Muestra en consola la orden cancelada
      console.log("Orden cancelada:", cancelada);

      // Retorna la orden cancelada
      return cancelada;
    } catch (err) {
      // Muestra el error en consola si ocurre al cancelar
      console.error("Error al cancelar orden:", err.message);

      // Lanza un error personalizado para la capa superior
      throw new Error("No se pudo cancelar la orden");
    }
  }
}

// Exporta el repositorio para que pueda ser utilizado en los casos de uso
export default OrderRepository;