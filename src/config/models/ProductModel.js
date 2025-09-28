// Importa el módulo mongoose para definir esquemas y modelos
import mongoose from "mongoose";

// Definición del esquema de producto
const productSchema = new mongoose.Schema({
  // Nombre del producto, obligatorio
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
    trim: true
  },

  // Descripción opcional del producto
  description: {
    type: String,
    trim: true
  },

  // Precio del producto, obligatorio y debe ser positivo
  price: {
    type: Number,
    required: [true, "El precio del producto es obligatorio"],
    min: [0, "El precio no puede ser negativo"]
  },

  // Cantidad disponible en inventario, por defecto 0
  stock: {
    type: Number,
    default: 0,
    min: [0, "El stock no puede ser negativo"]
  },

  // Categoría del producto (ej. electrónica, ropa, etc.)
  category: {
    type: String,
    trim: true
  },
}, { timestamps: true }); 

// Exporta el modelo de producto para usarlo en otras partes del proyecto
export default mongoose.model("Product", productSchema);