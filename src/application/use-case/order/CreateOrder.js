// Importa el repositorio de productos, que permite acceder y modificar productos en la base de datos
import ProductRepository from "../../../domain/repositories/ProductRepository.js";

// Define la clase CreateOrder, responsable de procesar y registrar nuevas órdenes
class CreateOrder {
  constructor(orderRepository) {
    // Inyección de dependencias: se recibe el repositorio de órdenes desde afuera
    this.orderRepository = orderRepository;

    // Se instancia directamente el repositorio de productos (no se inyecta)
    this.productRepository = new ProductRepository();
  }

  // Método principal para ejecutar la creación de una orden
  async execute(orderData) {
    // Extrae el usuario y los detalles del pedido desde los datos recibidos
    const { user, details } = orderData;

    // Validación: se asegura de que exista un usuario y al menos un producto en la orden
    if (!user || !details || details.length === 0) {
      throw new Error('Usuario y detalles del pedido son obligatorios');
    }

    // Inicializa el total de la orden y un arreglo para los detalles enriquecidos
    let total = 0;
    const detallesConPrecio = [];

    // Itera sobre cada producto incluido en la orden
    for (const item of details) {
      // Busca el producto en la base de datos por su ID
      const producto = await this.productRepository.findById(item.productId);

      // Si el producto no existe, lanza un error
      if (!producto) {
        throw new Error(`Producto no encontrado: ${item.productId}`);
      }

      // Verifica que haya suficiente stock para la cantidad solicitada
      if (producto.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto: ${producto.name}`);
      }

      // Calcula el precio unitario y el subtotal del producto
      const precioUnitario = producto.price;
      const subtotal = item.quantity * precioUnitario;

      // Suma el subtotal al total general de la orden
      total += subtotal;

      // Resta la cantidad solicitada del stock del producto
      const nuevoStock = producto.stock - item.quantity;

      // Actualiza el producto en la base de datos con el nuevo stock
      await this.productRepository.update(producto._id, { stock: nuevoStock });

      // Agrega el detalle enriquecido al arreglo final
      detallesConPrecio.push({
        productId: item.productId,
        quantity: item.quantity,
        precioUnitario,
        subtotal
      });
    }

    // Construye el objeto de la orden con todos los datos necesarios
    const order = {
      user,               // ID del cliente que realiza la orden
      total,                 // Total calculado de la orden
      status: 'activo',      // Estado inicial de la orden
      createdAt: new Date(), // Fecha de creación
      details: detallesConPrecio // Detalles enriquecidos con precio y subtotal
    };

    // Guarda la orden en la base de datos usando el repositorio de órdenes
    const orderCreada = await this.orderRepository.create(order);

    // Retorna una respuesta con mensaje, ID de la orden creada y el total
    return {
      message: 'Orden creada exitosamente',
      orderId: orderCreada._id,
      total
    };
  }
}

// Exporta la clase para que pueda ser utilizada en otros módulos del sistema
export default CreateOrder;