import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./interfaces/server.js";

// Conexiones internas (si son necesarias)
import connectProductDB from "./config/models/ProductModel.js";
import connectOrderDB from "./config/models/OrderModel.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ No se encontró MONGO_URI en el archivo .env");
  process.exit(1);
}

// Conexión principal a MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Si tienes funciones de conexión adicionales, las ejecutas aquí
Promise.all([
  connectProductDB(),
  connectOrderDB()
]).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Error al conectar a las bases de datos:", err.message);
});