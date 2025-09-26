// Importa el modelo de usuario desde la configuración de Mongoose
const UserModel = require('../../config/models/UserModel.js');

// Importa la interfaz base del repositorio de usuarios
const UserRepository = require('../../domain/repositories/UserRepository.js');

// Implementación del repositorio de usuarios usando MongoDB y Mongoose
class UserRepositoryMongo extends UserRepository {

  // Método para crear un nuevo usuario
  async create(userData) {
    // Crea una instancia del modelo con los datos recibidos
    const user = new UserModel(userData);

    // Guarda el usuario en MongoDB y retorna el resultado
    return await user.save();
  }

  // Método para buscar un usuario por su email
  async findByEmail(email) {
    // Busca el usuario por email y selecciona solo los campos necesarios
    return await UserModel.findOne({ email }).select("nombre email rol _id password");
  }

  // Método para obtener un usuario por su ID
  async getById(id) {
    // Busca y retorna el usuario con el ID especificado
    return await UserModel.findById(id);
  }

  // Método para obtener todos los usuarios
  async get() {
    // Retorna todos los documentos de la colección de usuarios
    return await UserModel.find();
  }

  // Método para actualizar un usuario por su ID
  async update(id, userData) {
    // Actualiza el usuario con los nuevos datos y retorna el documento actualizado
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  // Método para eliminar un usuario por su ID
  async delete(id) {
    // Elimina el usuario y retorna el documento eliminado
    return await UserModel.findByIdAndDelete(id);
  }
}

// Exporta el repositorio para que pueda ser utilizado en los casos de uso
export default UserRepositoryMongo;