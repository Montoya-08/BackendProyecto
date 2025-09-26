// Entidad User: representa un usuario en el dominio
class User {
  constructor({ nombre, email, password, rol }) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}

export default User;