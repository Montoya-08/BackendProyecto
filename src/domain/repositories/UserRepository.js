// Importa el modelo de usuario desde la configuración de Mongoose
import UserModel from "../../config/models/UserModel.js"; // ajusta la ruta según tu estructura

// Repositorio que encapsula las operaciones de persistencia relacionadas con usuarios
class UserRepository {

  // Método para buscar un usuario por su email
  async findByEmail(email) {
    // Retorna el primer usuario que coincida con el email proporcionado
    return await UserModel.findOne({ email });
  }

  // Método para crear un nuevo usuario en la base de datos
  async create(userData) {
    // Crea una instancia del modelo con los datos recibidos
    const user = new UserModel(userData);

    // Guarda el usuario en MongoDB y retorna el resultado
    return await user.save();
  }
}

// Exporta el repositorio para que pueda ser utilizado en los casos de uso
export default UserRepository;