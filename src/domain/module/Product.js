// Entidad que representa un producto en la lógica de negocio
class Product {

  // El constructor recibe un objeto con las propiedades del producto
  constructor({ id, nombre, descripcion, precio, stock, createdAt }) {
    this.id = id;                   // ID único del producto
    this.nombre = nombre;          // Nombre del producto
    this.descripcion = descripcion;// Descripción del producto
    this.precio = precio;          // Precio unitario
    this.stock = stock;            // Cantidad disponible
    this.createdAt = createdAt;    // Fecha de creación
  }
}

// Exporta la clase Product para que pueda ser utilizada en otras partes del proyecto
export default Product;