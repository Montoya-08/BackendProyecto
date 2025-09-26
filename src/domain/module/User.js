// Entidad User: representa un usuario en el dominio
class User {

  // El constructor recibe un objeto con las propiedades del usuario
  constructor({ nombre, email, password, rol }) {
    this.nombre = nombre;     // Nombre del usuario
    this.email = email;       // Correo electrónico del usuario
    this.password = password; // Contraseña del usuario
    this.rol = rol;           // Rol asignado al usuario (ej. admin, cliente)
  }
}

// Exporta la clase User para que pueda ser utilizada en otras partes del proyecto
export default User;