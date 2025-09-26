import mongoose from "mongoose";

const DetalleSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  cantidad: Number,
  precioUnitario: Number,
  subtotal: Number
});

const OrderSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  detalles: [DetalleSchema],
  total: Number,
  estado: { type: String, default: "activo" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);