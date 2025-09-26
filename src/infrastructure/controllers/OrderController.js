// Controlador para manejar operaciones relacionadas con órdenes
class OrderController {

  // El constructor recibe los casos de uso necesarios para operar sobre órdenes
  constructor(createOrder, cancelOrder, getOrderById, getOrders) {
    this.createOrder = createOrder;       // Caso de uso para crear una orden
    this.cancelOrder = cancelOrder;       // Caso de uso para cancelar una orden
    this.getOrderById = getOrderById;     // Caso de uso para obtener una orden por ID
    this.getOrders = getOrders;           // Caso de uso para obtener todas las órdenes
  }

  // Crear una nueva orden
  async create(req, res) {
    try {
      // Extrae los datos del cuerpo de la solicitud
      const orderData = req.body;

      // Ejecuta el caso de uso de creación de orden
      const result = await this.createOrder.execute(orderData);

      // Responde con estado 201 y la orden creada
      res.status(201).json(result);
    } catch (err) {
      // Muestra el error en consola y responde con estado 500
      console.error("Error al crear orden:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener todas las órdenes
  async get(req, res) {
    try {
      // Ejecuta el caso de uso para obtener todas las órdenes
      const orders = await this.getOrders.execute();

      // Responde con la lista de órdenes
      res.json(orders);
    } catch (err) {
      // Muestra el error en consola y responde con estado 500
      console.error("Error al obtener órdenes:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener una orden por ID
  async getById(req, res) {
    try {
      // Extrae el ID desde los parámetros de la URL
      const { id } = req.params;

      // Ejecuta el caso de uso para obtener la orden por ID
      const order = await this.getOrderById.execute(id);

      // Responde con la orden encontrada
      res.json(order);
    } catch (err) {
      // Muestra el error en consola y responde con estado 500
      console.error("Error al obtener orden por ID:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Cancelar una orden por ID
  async cancel(req, res) {
    try {
      // Extrae el ID desde los parámetros de la URL
      const { id } = req.params;

      // Ejecuta el caso de uso para cancelar la orden
      const result = await this.cancelOrder.execute(id);

      // Responde con la orden cancelada
      res.json(result);
    } catch (err) {
      // Muestra el error en consola y responde con estado 500
      console.error("Error al cancelar orden:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
}

// Exporta el controlador para que pueda ser utilizado en las rutas
export default OrderController;