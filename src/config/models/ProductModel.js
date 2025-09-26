// Importa el módulo mongoose para definir esquemas y modelos
import mongoose from "mongoose";

// Definición del esquema de producto
const productSchema = new mongoose.Schema({
  // Nombre del producto, obligatorio
  nombre: { type: String, required: true },

  // Descripción opcional del producto
  descripcion: String,

  // Precio del producto, obligatorio
  precio: { type: Number, required: true },

  // Cantidad disponible en inventario, por defecto 0
  stock: { type: Number, default: 0 },

  // Categoría del producto (ej. electrónica, ropa, etc.)
  categoria: String,

  // Fecha de creación del producto, por defecto la fecha actual
  creadoEn: { type: Date, default: Date.now }
});

// Exporta el modelo de producto para usarlo en otras partes del proyecto
export default mongoose.model("Product", productSchema);