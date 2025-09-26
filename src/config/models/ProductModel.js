import mongoose from "mongoose";

// Definición del esquema de producto
const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categoria: String,
  creadoEn: { type: Date, default: Date.now }
});

// Exporta el modelo de producto
export default mongoose.model("Product", productSchema);