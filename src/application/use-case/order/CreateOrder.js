import ProductRepository from "../../../domain/repositories/ProductRepository.js";

// Importa el repositorio de productos. Notar que se importa directamente
// en lugar de inyectarse, lo cual rompe el patrón de Inyección de Dependencias
// del constructor para esta dependencia específica.

class CreateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = new ProductRepository();
  }
// El constructor recibe el 'orderRepository' (Inyección de Dependencias)
// y crea una nueva instancia del 'ProductRepository' internamente.

  async execute(orderData) {
// El método 'execute' es el punto de entrada principal para crear el pedido.
// Es asíncrono debido a las interacciones con los repositorios.

    const { cliente, detalles } = orderData;
// Desestructura los datos de entrada para obtener el ID del cliente y los detalles de los ítems.

    if (!cliente || !detalles || detalles.length === 0) {
      throw new Error('Cliente y detalles del pedido son obligatorios');
    }
// Validación inicial: Se asegura de que el cliente y, al menos, un detalle de ítem existan.

    let total = 0;
    const detallesConPrecio = [];
// Inicializa la variable 'total' del pedido y un array para almacenar los detalles enriquecidos.

    for (const item of detalles) {
// Itera sobre cada ítem (producto) del pedido.

      const producto = await this.productRepository.findById(item.productoId);
// Busca el producto en la base de datos para obtener su información, especialmente el precio.

      if (!producto) throw new Error(`Producto no encontrado: ${item.productoId}`);
// Lanza un error si alguno de los productos listados en el pedido no existe.

      const precioUnitario = producto.precio;
      const subtotal = item.cantidad * precioUnitario;
// Obtiene el precio real del producto y calcula el subtotal de la línea.

      total += subtotal;
// Suma el subtotal al total general del pedido.

      detallesConPrecio.push({
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal
      });
// Agrega el detalle enriquecido (con precios calculados) al nuevo array.
    }

    const order = {
      usuarioId: cliente,
      total,
      estado: 'activo',
      createdAt: new Date(),
      detalles: detallesConPrecio
    };
// Construye el objeto final del pedido, que incluye el total calculado
// y establece valores por defecto como el 'estado' y la fecha de creación.

    const orderCreado = await this.orderRepository.create(order);
// Persiste (guarda) el nuevo pedido en la base de datos usando el 'orderRepository'.

    return {
      message: 'Orden creada exitosamente',
      orderId: orderCreado._id,
      total
    };
// Retorna un objeto de confirmación que incluye el ID del pedido creado y el total.
  }
}

export default CreateOrder;
// Exporta la clase para su uso.