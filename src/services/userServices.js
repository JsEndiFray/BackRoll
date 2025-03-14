import UserRepository from "../repository/userRepository.js";

export default class UserServices {

// Obtener todos los usuarios
    static async getAllUsers() {
            return await UserRepository.getAllUsers();
    }

    // búsqueda por email o por nombre y apellido
    static async getUsers(email, name, lastname, phone) {
        if (!email && !phone && (!name || !lastname)) return null;

        let user = email ? await UserRepository.findByEmail(email) : null;
        if (!user && phone) user = await UserRepository.findByPhone(phone);
        if (!user && name && lastname) user = await UserRepository.findByNameAndLastname(name, lastname);

        return user;

    }

    // Obtener un usuario por ID
    static async getUserById(id) {
        if (!id || isNaN(id)) return null;
        return await UserRepository.getUserById(id);
    }

    // verifica si el nuevo usuario existe
    static async createUser(user) {
        const { email, phone } = user;
        const existingUser = await UserRepository.findByEmailOrPhone(email, phone);
        if (existingUser) return { error: "El usuario ya existe." };

        const userId = await UserRepository.createUser(user);
        return { msg: "Usuario creado correctamente", id: userId, user };

    }

    //actualizar el usuario
    static async updateUser(user) {
        if (!user.id || isNaN(user.id)) return { error: "ID inválido." };

        const existingUser = await UserRepository.getUserById(user.id);
        if (!existingUser) return { error: "Usuario no encontrado." };

        const updated = await UserRepository.updateUser(user);
        return updated ? { msg: "Usuario actualizado correctamente", user } : { error: "No se realizaron cambios." };
    }

    //eliminar el usuario creado
    static async deleteUser(id) {
        if (!id || isNaN(id)) return false;
        const existingUser = await UserRepository.getUserById(id);
        if (!existingUser) {
            return false;
        }
        return  await UserRepository.deleteUser(id);
    }

}
