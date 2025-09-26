import UserModel from "../../config/models/UserModel.js"; // ajusta la ruta según tu estructura

class UserRepository {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }
}

export default UserRepository;