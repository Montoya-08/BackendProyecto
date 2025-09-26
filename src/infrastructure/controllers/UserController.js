// Controlador que conecta las rutas con los casos de uso
class UserController {

  // El constructor recibe los casos de uso necesarios para operar sobre usuarios
  constructor(createUsers, getUserById, getUsers, updateUser, deleteUser) {
    this.createUser = createUsers;       // Caso de uso para crear un usuario
    this.getUserById = getUserById;      // Caso de uso para obtener un usuario por ID
    this.getUsers = getUsers;            // Caso de uso para obtener todos los usuarios
    this.updateUser = updateUser;        // Caso de uso para actualizar un usuario
    this.deleteUser = deleteUser;        // Caso de uso para eliminar un usuario
  }

  // Crear un nuevo usuario
  async create(req, res) {
    try {
      // Ejecuta el caso de uso con los datos del cuerpo de la solicitud
      const nuevoUsuario = await this.createUser.execute(req.body);

      // Responde con estado 201 y el usuario creado
      res.status(201).json(nuevoUsuario);
    } catch (err) {
      // Si hay error de validación, responde con estado 400 y el mensaje
      res.status(400).json({ error: err.message });
    }
  }

  // Obtener un usuario por su ID
  async getById(req, res) {
    try {
      // Ejecuta el caso de uso con el ID recibido por parámetro
      const user = await this.getUserById.execute(req.params.id);

      // Responde con el usuario encontrado
      res.json(user);
    } catch (err) {
      // Si no se encuentra, responde con estado 404 y el mensaje
      res.status(404).json({ error: err.message });
    }
  }

  // Obtener todos los usuarios
  async get(req, res) {
    try {
      // Ejecuta el caso de uso para obtener todos los usuarios
      const users = await this.getAllUsers.execute();

      // Responde con la lista de usuarios
      res.json(users);
    } catch (err) {
      // Si hay error interno, responde con estado 500 y el mensaje
      res.status(500).json({ error: err.message });
    }
  }

  // Actualizar un usuario por su ID
  async update(req, res) {
    try {
      // Ejecuta el caso de uso con el ID y los nuevos datos
      const user = await this.updateUser.execute(req.params.id, req.body);

      // Responde con el usuario actualizado
      res.json(user);
    } catch (err) {
      // Si hay error de validación, responde con estado 400 y el mensaje
      res.status(400).json({ error: err.message });
    }
  }

  // Eliminar un usuario por su ID
  async delete(req, res) {
    try {
      // Ejecuta el caso de uso para eliminar el usuario
      await this.deleteUser.execute(req.params.id);

      // Responde con estado 204 (sin contenido)
      res.status(204).send();
    } catch (err) {
      // Si no se encuentra, responde con estado 404 y el mensaje
      res.status(404).json({ error: err.message });
    }
  }
}

// Exporta el controlador para que pueda ser utilizado en las rutas
export default UserController;