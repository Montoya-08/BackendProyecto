// domain/repositories/UserRepository.js
import UserModel from '../../config/models/UserModel.js';

class UserRepository {
  // Método para buscar un usuario por su email
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  // Método para crear un nuevo usuario en la base de datos
  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  // Método para obtener todos los usuarios
  async findAll() {
    return await UserModel.find({}, 'name email rol createdAt');
  }
}

export default UserRepository;