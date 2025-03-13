import {validationResult} from "express-validator";
import UserServices from "../services/userServices.js";

export default class UserControllers {
    // Obtener todos los usuarios
    static async getAllUsers(req, res) {
        try {
            const users = await UserServices.getAllUsers();
            if (users.length === 0) {
                return res.status(404).json({msg: 'No hay usuarios registrados'})
            }
            return res.status(200).json({
                msg: 'Los usuarios registrados',
                users: users
            });
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    // búsqueda por email o por nombre y apellido
    static async getUsers(req, res) {
        try {
            const {email, name, lastname, phone} = req.query;
            // Validar que al menos un criterio de búsqueda esté presente
            if (!email && !phone && (!name || !lastname)) {
                return res.status(400).json({error: "Debes proporcionar un email, teléfono o nombre y apellido."});
            }
            const user = await UserServices.getUsers(email, name, lastname, phone);
            if (!user) {
                return res.status(404).json({msg: 'Usuario no encontrado'})
            }
            res.status(200).json({msg: 'Usuario encontrado', user});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    // Obtener un usuario por ID
    static async getUserById(req, res) {
        try {
            const {id} = req.params;
            const user = await UserServices.getUserById(id);
            if (!user) {
                return res.status(404).json({msg: `Usuario con ID ${id} no encontrado`});
            }
            return res.status(200).json({msg: `Usuario con ID ${id}`});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    // Crear un nuevo usuario
    static async createUser(req, res) {
        try {
            //capturar error de validación
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({msg: "Errores de validación", errors: errors.array()});
            }
            const {name, lastname, email, phone, rol, message} = req.body;
            const user = await UserServices.createUser({name, lastname, email, phone, rol, message});
            // si lanza el error si el usuario existe
            if (user?.error) {
                return res.status(400).json({msg: user.error});
            }
            return res.status(201).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    //actualizar el usuario
    static async updateUser(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({error: "ID inválido, debe ser un numero (controlles)"})
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({msg: "Errores de validación", errors: errors.array()});
            }

            const userData = {id, ...req.body};
            const user = await UserServices.updateUser(userData);
            if (user.error) {
                return res.status(400).json({msg: user.error});
            }
            return res.status(200).json({user});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }

    }
}