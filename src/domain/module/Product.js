// Entidad que representa un producto en la lógica de negocio
class Product {

  // El constructor recibe un objeto con las propiedades del producto
  constructor({ id, name, description, price, stock, createdAt }) {
    this.id = id;                   // ID único del producto
    this.name = name;               // Nombre del producto
    this.description = description; // Descripción del producto
    this.price = price;             // Precio unitario
    this.stock = stock;             // Cantidad disponible
    this.createdAt = createdAt;     // Fecha de creación
  }
}

// Exporta la clase Product para que pueda ser utilizada en otras partes del proyecto
export default Product;