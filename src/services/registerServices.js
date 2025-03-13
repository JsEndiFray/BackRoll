import registerRepository from "../repository/registerRepository.js";
import UserRepository from "../repository/userRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default class AuthService {

    // Registrar usuario para login
    static async createRegister(username, password, email, rol) {
        try {
            // 1 Buscar al usuario en data_register por su email
            const user = await registerRepository.getUserByUserRegister(username, email);
            if (!user){
                return { error: "No existe ningún usuario registrado" }
            }

            // 2 Crear su usuario en data_register usando el user_id de data_base
            const user_id = user.id;
            const newUser = await registerRepository.createUserRegister(user_id, username, password, rol);

            return newUser ? { success: "Usuario registrado correctamente" } : { error: "No se pudo registrar el usuario" };
        } catch (error) {
            console.error("Error en registerUser:", error);
            return { error: "Error en el servidor" };
        }
    }

    // login de usuario
    static async login(username, password) {
        try {
            const user = await registerRepository.getUserByUserRegister(username);
            if (!user){
                return { error: "Usuario no encontrado (login)" };
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return { error: "Contraseña incorrecta" };
            }

            const token = jwt.sign(
                { user_id: user.user_id, username: user.username, rol: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return { token, user: { id: user.user_id, username: user.username, rol: user.rol } };
        } catch (error) {
            console.error("Error en login:", error);
            return { error: "Error en el servidor" };
        }
    }






}