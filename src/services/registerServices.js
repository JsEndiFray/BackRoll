import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import registerRepository from "../repository/registerRepository.js";

process.loadEnvFile();
const SECRET_KEY = process.env.JWT_SECRET

export default class AuthRegisterService {

    // validación de administrador
    static async isAdmin(userID) {
        const user = await registerRepository.getUserById(userID);
        if (!user || user.rol !== "admin") {
            throw new Error("Acceso denegado. Solo el administrador autorizado.")
        }
    }

    //obtener datos de los registros (todos)
    static async getAllUsers() {
        return await registerRepository.getAllUsers();
    }

    //Búsqueda del usuario (todos)
    static async getUser(username, email) {
        if (!username && !email) return null;
        await registerRepository.findByUsernameOrEmail(username, email);
    }

    // Obtener un usuario por ID (todos)
    static async getUserById(id) {
        return await registerRepository.getUserById(id) || null;
    }
    //  crea y verifica si existe (solo admin)
    static async createUser(adminId, userData) {
        await this.isAdmin(adminId); // validación de administrador

        const {username, email, password} = userData;
        const existingUser = await registerRepository.findByUsernameOrEmail(username, email);
        if (existingUser) return null;

        //Hash la contraseña antes de guardarla
        userData.password = await bcrypt.hash(password, 10);
        return await registerRepository.createUser(userData);
    }


    // actualizar al usuario (solo admin)
    static async updateUser(adminId, userData) {
        await this.isAdmin(adminId); // validación de administrador

        const {id, username, email} = userData;
        const existingUser = await registerRepository.findByUsernameOrEmail(username, email);
        if (existingUser && existingUser.id !== id) {
            return null;
        }
        //se quiere actualizar la contraseña, la hash
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return await registerRepository.updateUser(userData);
    }

    //eliminar el usuario (solo admin)
    static async deleteUser(adminId, userId) {
        await this.isAdmin(adminId);  // validación de administrador

        const existingUser = await registerRepository.getUserById(userId);
        if (!existingUser) return null;
        return await registerRepository.deleteUser(userId);
    }

    //LOGIN Verifica usuario y genera JWT
    static async login(username, password) {
        const user = await registerRepository.findByUsernameOrEmail(username);
        if (!user) return { error: true };
        //Comparar la contraseña con la hash
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) return { error: true };


        // Generar token JWT
        const token = jwt.sign({
            id: user.id, username: user.username, rol: user.rol
        }, SECRET_KEY, {expiresIn: "1h"});
        return {token, user};
    };

    //verificación del token
    static verifyToken(token) {
        try {
            return jwt.verify(token, SECRET_KEY)
        } catch (error) {
            throw new Error("Token invalido")

        }
    }



}