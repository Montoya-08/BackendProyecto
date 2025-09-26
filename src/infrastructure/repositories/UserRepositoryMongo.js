const UserModel = require('../../config/models/UserModel.js');
const UserRepository = require('../../domain/repositories/UserRepository.js');

class UserRepositoryMongo extends UserRepository {
  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email }).select("nombre email rol _id password");
  }

  async getById(id) {
    return await UserModel.findById(id);
  }

  async get() {
    return await UserModel.find();
  }

  async update(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default UserRepositoryMongo;