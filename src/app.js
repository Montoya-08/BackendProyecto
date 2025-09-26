// Importa mongoose para manejar la conexión con MongoDB
import mongoose from "mongoose";

// Importa dotenv para acceder a variables de entorno desde el archivo .env
import dotenv from "dotenv";

// Importa la aplicación Express ya configurada
import app from "./interfaces/server.js";

// Importa funciones internas de conexión (si están definidas en los modelos)
import connectProductDB from "./config/models/ProductModel.js";
import connectOrderDB from "./config/models/OrderModel.js";

// Carga las variables de entorno
dotenv.config();

// Define el puerto del servidor, usando el valor del entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// URI de conexión a MongoDB, obtenida desde el archivo .env
const uri = process.env.MONGO_URI;

// Verifica que la URI exista, si no, muestra error y detiene el proceso
if (!uri) {
  console.error("No se encontró MONGO_URI en el archivo .env");
  process.exit(1);
}

// Conexión principal a MongoDB usando mongoose
mongoose
  .connect(uri)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Ejecuta funciones adicionales de conexión si están definidas
Promise.all([
  connectProductDB(), // Conexión o inicialización relacionada con productos
  connectOrderDB()    // Conexión o inicialización relacionada con órdenes
])
  .then(() => {
    // Inicia el servidor Express una vez que todo está conectado
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // Muestra error si alguna conexión adicional falla
    console.error("Error al conectar a las bases de datos:", err.message);
  });