import bcrypt from 'bcryptjs';

// Se importa la librería 'bcryptjs', esencial para el hashing seguro de contraseñas.

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
// La clase 'RegisterUser' actúa como un Caso de Uso.
// El 'constructor' recibe e inyecta una dependencia: 'userRepository'.
// Este repositorio es responsable de las operaciones de persistencia de datos (ej. buscar, crear).

  async execute(userData) {
// El método 'execute' es el punto de entrada para registrar al usuario.
// Es un método 'async' debido a las operaciones asíncronas de base de datos y de bcrypt.
// Recibe un objeto 'userData' con los datos del nuevo usuario (nombre, email, password, rol, etc.).

    const existing = await this.userRepository.findByEmail(userData.email);
// Se intenta buscar si ya existe un usuario con el 'email' proporcionado.

    if (existing) throw new Error('Email ya registrado');
// Si se encuentra un usuario existente, se lanza un error para detener el registro
// y asegurar que el email sea único.

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(userData.password, 10);
// **Lógica de Seguridad Crítica:** Se hashea la contraseña (`userData.password`)
// utilizando 'bcrypt.hash'. El número '10' es el factor de costo (saltRounds),
// que define la complejidad del hashing (a mayor número, más seguro, pero más lento).
// Esta operación es asíncrona.

    const newUser = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      rol: userData.rol,
    };
// Se construye el objeto 'newUser' que se guardará.
// **Importante:** Se utiliza el 'hashedPassword' en lugar de la contraseña en texto plano.

return await this.userRepository.create(newUser);
// Finalmente, se llama al método 'create' del 'userRepository'
// para guardar el objeto 'newUser' (con la contraseña hasheada) en la base de datos.
// Se retorna el resultado de la operación de creación (ej. el usuario creado con su ID).
 }
}

export default RegisterUser;
// Exporta la clase 'RegisterUser' para ser utilizada como un servicio o caso de uso.