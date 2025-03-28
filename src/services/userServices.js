
import userRepository from "../repository/userRepository.js";

export default class UserServices {

// Obtener todos los usuarios
    static async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    // búsqueda por email o por nombre y apellido
    static async getUsers(email, name, lastname, phone) {
        if (!email && !phone && !name && !lastname) return null;

        let user = null;
        if (email) user = await userRepository.findByEmail(email);
        if (!user && phone) user = await userRepository.findByPhone(phone);
        if (!user && name && lastname) user = await userRepository.findByNameAndLastname(name, lastname);
        if (!user && name && !lastname) user = await userRepository.findByName(name);
        if (!user && lastname && !name) user = await userRepository.findByLastname(lastname);

        return user;
    }

    // Obtener un usuario por ID
    static async getUserById(id) {
        if (!id || isNaN(id)) return null;
        return await userRepository.getUserById(id);
    }

    // verifica si el nuevo usuario existe
    static async createUser(user) {
        const {email, phone} = user;
        const existingUser = await userRepository.findByEmailOrPhone(email, phone);
        if (existingUser) return null;

        const userId = await userRepository.createUser(user);
        return {id: userId, user};

    }

    //actualizar el usuario
    static async updateUser(user) {
        if (!user.id || isNaN(user.id)) return null;

        const existingUser = await userRepository.getUserById(user.id);
        if (!existingUser) return null;

        const updated = await userRepository.updateUser(user);
        return updated ? user: null;
    }

    //eliminar el usuario creado
    static async deleteUser(id) {
        if (!id || isNaN(id)) return false;

        const existingUser = await userRepository.getUserById(id);
        if (!existingUser) return false;
        return await userRepository.deleteUser(id);
    }

}
