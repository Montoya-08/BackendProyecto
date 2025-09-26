// Importa el módulo mongoose para definir esquemas y modelos
import mongoose from "mongoose";

// Define el esquema para los detalles de una orden
const DetalleSchema = new mongoose.Schema({
  // Referencia al producto asociado (relación con el modelo "Product")
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

  // Cantidad de unidades del producto en la orden
  cantidad: Number,

  // Precio por unidad del producto
  precioUnitario: Number,

  // Subtotal calculado (cantidad * precioUnitario)
  subtotal: Number
});

// Define el esquema principal para la orden
const OrderSchema = new mongoose.Schema({
  // Referencia al cliente que hizo la orden (relación con el modelo "Usuario")
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },

  // Arreglo de detalles que contiene los productos de la orden
  detalles: [DetalleSchema],

  // Total de la orden (suma de subtotales)
  total: Number,

  // Estado de la orden, por defecto "activo"
  estado: { type: String, default: "activo" },

  // Fecha de creación de la orden, por defecto la fecha actual
  createdAt: { type: Date, default: Date.now }
});

// Exporta el modelo "Order" basado en el esquema definido
export default mongoose.model("Order", OrderSchema);