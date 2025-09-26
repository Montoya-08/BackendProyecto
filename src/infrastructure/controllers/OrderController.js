class OrderController {
  constructor(createOrder, cancelOrder, getOrderById, getOrders) {
    this.createOrder = createOrder;
    this.cancelOrder = cancelOrder;
    this.getOrderById = getOrderById;
    this.getOrders = getOrders;
  }

  // Crear una nueva orden
  async create(req, res) {
    try {
      const orderData = req.body;
      const result = await this.createOrder.execute(orderData);
      res.status(201).json(result);
    } catch (err) {
      console.error("❌ Error al crear orden:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener todas las órdenes
  async get(req, res) {
    try {
      const orders = await this.getOrders.execute();
      res.json(orders);
    } catch (err) {
      console.error("❌ Error al obtener órdenes:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener una orden por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const order = await this.getOrderById.execute(id);
      res.json(order);
    } catch (err) {
      console.error("❌ Error al obtener orden por ID:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async cancel(req, res) {
    try {
      const { id } = req.params;
      const result = await this.cancelOrder.execute(id);
      res.json(result);
    } catch (err) {
      console.error("❌ Error al cancelar orden:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
}

export default OrderController;