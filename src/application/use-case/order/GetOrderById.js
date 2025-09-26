class GetOrderById {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id) {
    return await this.orderRepository.getById(id);
  }
}

export default GetOrderById;