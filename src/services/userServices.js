import UserRepository from "../repository/userRepository.js";

export default class UserServices {

// Obtener todos los usuarios
    static async getAllUsers() {
        try {
            return await UserRepository.getAllUsers();
        } catch (error) {
            console.error("Error getAllUsers (services) ", error);
            throw new Error('Error al obtener los usuarios');
        }
    }

    // búsqueda por email o por nombre y apellido
    static async getUsers(email, name, lastname, phone) {
        try {
            let user= null;
            if(email){
                user = await UserRepository.findByEmail(email);
            }
            if(!user && phone){
                user = await UserRepository.findByPhone(phone);
            }
            if (!user && name && lastname) {
                user = await UserRepository.findByNameAndLastname(name, lastname);
            }
            return user;
        } catch (error) {
            console.error("Error getUsers (services) ", error);
            throw new Error("Error al obtener el usuario");
        }

    }

    // Obtener un usuario por ID
    static async getUserById(id) {
        try {
            return await UserRepository.getUserById(id);
        } catch (error) {
            console.error(`Error consulta ir (service)`, error);
            throw new Error(`Error al consultar la id: (${id}):`);
        }
    }

    // verifica si el nuevo usuario existe
    static async createUser(user) {
        try {
            const existingUser = await UserRepository.findByEmailOrPhone(user.email, user.phone);
            if (existingUser) {
                return {error: 'El usuario con el email o teléfono ya existe en la base de datos'};
            }
            // Crear un nuevo usuario
            const userId = await UserRepository.createUser(user);
            return {msg: 'Usuario creado correctamente', id: userId, user};
        } catch (error) {
            console.error("Error crear al usuario:(services) ", error);
            throw new Error('Error al crear el usuario:');
        }

    }

    //actualizar el usuario
    static async updateUser(user) {
        try {
            if (!user.id || isNaN(user.id)) {
                return { error: "ID inválido, debe ser un número (services)" };
            }
            const existingUser = await UserRepository.getUserById(user.id);
            if (!existingUser) {
                return {error: 'Usuario no encontrado.'}
            }
            const updated = await UserRepository.updateUser(user);
            if (!updated) {
                return {error: 'No se ha realizado cambio o el usuario no existe.'}
            }
            return {msg: 'Usuario actualizado correctamente', user};

        } catch (error) {
            console.error("Error al actualización (services)", error);
            throw new Error('Error al actualizar al usuario');
        }
    }

}
