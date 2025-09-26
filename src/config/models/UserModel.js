// Importa el módulo mongoose para definir esquemas y modelos
import mongoose from "mongoose";

// Define el esquema del usuario
const userSchema = new mongoose.Schema({
  // Nombre del usuario
  nombre: String,

  // Email del usuario, debe ser único en la base de datos
  email: { type: String, unique: true },

  // Contraseña del usuario
  password: String,

  // Rol del usuario (ej. admin, cliente, etc.)
  rol: String
});

// Crea el modelo "User" basado en el esquema definido
const UserModel = mongoose.model("User", userSchema);

// Exporta el modelo para que pueda ser utilizado en otras partes del proyecto
export default UserModel;