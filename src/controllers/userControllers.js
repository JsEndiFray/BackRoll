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
            return res.status(200).json({msg: 'Usuarios registrados', users});
        } catch (error) {
            res.status(500).json({error: 'Error interno del servidor'});
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
            res.status(500).json({msg: "Error interno del servidor"});
        }
    }

    // Obtener un usuario por ID
    static async getUserById(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({error: "ID inválido."});
            }
            const user = await UserServices.getUserById(id);
            if (!user) {
                return res.status(404).json({msg: `Usuario con ID ${id} no encontrado.`});
            }
            return res.status(200).json({msg: "Usuario encontrado", user});
        } catch (error) {
            res.status(500).json({msg: "Error interno del servidor"});
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
            const user = await UserServices.createUser(req.body);
            // si lanza el error si el usuario existe
            if (user.error) {
                return res.status(400).json({msg: user.error});
            }
            return res.status(201).json(user);
        } catch (error) {
            res.status(500).json({msg: "Error interno del servidor"});
        }
    }

    //actualizar el usuario
    static async updateUser(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({error: "ID inválido, debe ser un numero"})
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
            res.status(500).json({msg: "Error interno del servidor"});
        }

    }

    //eliminar el usuario creado
    static async deleteUser(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({error: "ID inválido, debe ser un numero (controllers)"})
            }
            const deleted = await UserServices.deleteUser(id)
            if (!deleted) {
                return res.status(404).json({msg: `Usuario con ID ${id} no encontrado`})
            }
            return res.status(200).json({msg: `Usuario con ID ${id} ha sido eliminado`});
        } catch (error) {
            res.status(500).json({msg: "Error interno del servidor"})
        }

    }
}