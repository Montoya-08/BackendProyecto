// config/models/UserModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  rol: String
}, { timestamps: true }); // activa createdAt y updatedAt

const UserModel = mongoose.model('User', userSchema);

export default UserModel;