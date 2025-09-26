// Importa el modelo de orden desde la configuración de Mongoose
const OrderModel = require('../../config/models/OrderModel.js');

// Importa la interfaz base del repositorio de órdenes
const OrderRepository = require('../../domain/repositories/OrderRepository.js');

// Importa el repositorio de productos para validar y obtener precios
const ProductRepository = require('./ProductRepository.js');

// Implementación del repositorio de órdenes usando MongoDB
class OrderRepositoryMongo extends OrderRepository {

  // Constructor que inicializa el repositorio de productos
  constructor() {
    super(); // Llama al constructor de la clase base
    this.productRepository = new ProductRepository(); // Instancia el repositorio de productos
  }

  // Método para crear una nueva orden
  async create(orderData) {
    const { cliente, detalles } = orderData;

    // Validación básica: cliente y detalles son obligatorios
    if (!cliente || !detalles || detalles.length === 0) {
      throw new Error('Cliente y detalles del pedido son obligatorios');
    }

    let total = 0; // Acumulador del total de la orden
    const detallesConPrecio = []; // Arreglo para almacenar los detalles con precio calculado

    // Itera sobre cada ítem del pedido
    for (const item of detalles) {
      // Busca el producto por ID
      const producto = await this.productRepository.findById(item.productoId);

      // Si no se encuentra el producto, lanza error
      if (!producto) throw new Error(`Producto no encontrado: ${item.productoId}`);

      // Obtiene el precio unitario y calcula el subtotal
      const precioUnitario = producto.precio;
      const subtotal = item.cantidad * precioUnitario;
      total += subtotal; // Suma al total

      // Agrega el detalle con precio al arreglo
      detallesConPrecio.push({
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal
      });
    }

    // Crea una nueva instancia del modelo de orden con los datos completos
    const order = new OrderModel({
      usuarioId: cliente,
      total,
      estado: 'activo',
      createdAt: new Date(),
      detalles: detallesConPrecio
    });

    // Guarda la orden en MongoDB y retorna el resultado
    return await order.save();
  }

  // Método para obtener una orden por su ID
  async getById(id) {
    // Busca la orden y hace populate del usuario asociado
    return await OrderModel.findById(id).populate('usuarioId');
  }

  // Método para obtener todas las órdenes
  async get() {
    // Busca todas las órdenes y hace populate del usuario asociado
    return await OrderModel.find().populate('usuarioId');
  }

  // Método para cancelar una orden por su ID
  async cancel(id) {
    // Actualiza el estado de la orden a "cancelado" y retorna la versión actualizada
    return await OrderModel.findByIdAndUpdate(id, { estado: 'cancelado' }, { new: true });
  }
}

// Exporta el repositorio para que pueda ser utilizado en los casos de uso
export default OrderRepositoryMongo;