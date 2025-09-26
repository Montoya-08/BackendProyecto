import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: String
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;