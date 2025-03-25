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
    static async getAllRegisters() {
        return await registerRepository.getAllRegister();
    }

    //Búsqueda del usuario (todos)
    static async getUser(username, email) {
        if (!username && !email) return null;
        const user = await registerRepository.findByUsernameOrEmail(username, email);
        return user || null;

    }

    // Obtener un usuario por ID (todos)
    static async getUserById(id) {
        const user = await registerRepository.getUserById(id);
        if (!user) return null;
        return registerRepository.getUserById(id);

    }

    //  crea y verifica si existe (solo admin)
    static async createRegister(adminId, userData) {
        await this.isAdmin(adminId); // validación de administrador
        const {username, email, password} = userData;
        const existingUser = await registerRepository.findByUsernameOrEmail(username, email);
        if (existingUser) return null;
        //Hashear la contraseña antes de guardarla
        userData.password = await bcrypt.hash(password, 10);
        return await registerRepository.createUserName(userData);
    }


    // actualizar al usuario (solo admin)
    static async updateRegister(adminId, userData) {
        await this.isAdmin(adminId); // validación de administrador

        const {id, username, email} = userData;
        const existingUser = await registerRepository.findByUsernameOrEmail(username, email);
        if (existingUser && existingUser.id !== id) {
            return null; // Ya existe otro usuario con ese username o email
        }
        //se quiere actualizar la contraseña, la hasheamos
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return await registerRepository.updateRegister(userData);
    }

    //eliminar el usuario
    static async deleteRegister(adminId, registerId) {
        await this.isAdmin(adminId);  // validación de administrador

        const existingUser = await registerRepository.getUserById(registerId);
        if (!existingUser) {
            throw new Error("Usuario no encontrado")
        }
        return await registerRepository.deleteRegister(registerId);
    }


    git

    //LOGIN Verifica usuario y genera JWT
    static async login(username, password) {
        const user = await registerRepository.findByUsernameOrEmail(username);
        if (!user) {
            throw new Error("Contraseña invalida");
        }
        //Comparar la contraseña con la hasheada
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Contraseña invalida");
        }
        // Generar token JWT
        const token = jwt.sign({
            id: user.id, username: user.username, role: user.role
        }, SECRET_KEY, {expiresIn: "1h"});
        return {token, user};
    }

    //verificación del token
    static verifyToken(token) {
        try {
            return jwt.verify(token, SECRET_KEY)
        } catch (error) {
            throw new Error("Token invalido")

        }
    }



}