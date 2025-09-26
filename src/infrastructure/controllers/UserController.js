// Controlador que conecta las rutas con los casos de uso
class UserController {
  constructor(createUsers, getUserById, getUsers, updateUser, deleteUser) {
    this.createUser = createUsers;
    this.getUserById = getUserById;
    this.getUsers = getUsers;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
  }

  async create(req, res) {
  try {
    const nuevoUsuario = await this.createUser.execute(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

  async getById(req, res) {
    try {
      const user = await this.getUserById.execute(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async get(req, res) {
    try {
      const users = await this.getAllUsers.execute();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const user = await this.updateUser.execute(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await this.deleteUser.execute(req.params.id);
      res.status(204).send(); // Sin contenido
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default UserController;