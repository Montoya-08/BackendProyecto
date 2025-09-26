class GetOrders {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    return await this.orderRepository.get();
  }
}

export default GetOrders;