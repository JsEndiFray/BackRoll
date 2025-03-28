import {validationResult} from "express-validator";
import UserServices from "../services/userServices.js";

export default class UserControllers {
    // Obtener todos los usuarios
    static async getAllUsers(req, res) {
        try {
            const users = await UserServices.getAllUsers();
            if (!users || users.length === 0) {
                return res.status(404).json({msg: 'No hay usuarios registrados'})
            }
            return res.status(200).json({msg: 'Usuarios registrados', users});
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({error: 'Error al obtener usuarios'});
        }
    }

    // búsqueda por email o por nombre y apellido
    static async getUsers(req, res) {
        try {
            const {name, lastname,email, phone} = req.query;
            // Validar que al menos un criterio de búsqueda esté presente
            if (!email && !phone && !name && !lastname) {
                return res.status(400).json({ error: "Debes proporcionar al menos un criterio de búsqueda (nombre, apellido, email o teléfono)." });
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
            if (!req.user?.rol) {
                return res.status(401).json({ msg: "No autorizado." });
            }
            if (req.user.rol === 'empleado') {
                req.body.rol = 'cliente'; // 🔒 Forzado sí o sí
            }
            const created = await UserServices.createUser(req.body);
            // si lanza el error si el usuario existe
            if (!created) {
                return res.status(400).json({msg:"El usuario ya existe." });
            }
            return res.status(201).json({
                msg: "Usuario creado correctamente",
                user: created
            });
        } catch (error) {
            console.error("Error al crear usuario:", error);
            res.status(500).json({msg: "Error interno del servidor"});
        }
    }

    //actualizar el usuario
    static async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const id = Number(req.params.id);
            if (isNaN(id)){
                return res.status(400).json({ msg: "ID inválido." });
            }
            //no pueden actualizar el rol los empleados
            if (req.user?.rol === 'empleado') {
                delete req.body.rol;
            }

            const { name, lastname, email, rol, message } = req.body;
            const user = { id, name, lastname, email, rol, message };

            const updated = await UserServices.updateUser(user);
            if (!updated) {
                return res.status(404).json({ msg: "Usuario no encontrado o sin cambios aplicados." });
            }

            res.status(200).json({ msg: "Usuario actualizado correctamente", user: updated });
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            res.status(500).json({ msg: "Error interno al actualizar usuario" });
        }
    }


    //eliminar el usuario creado
    static async deleteUser(req, res) {
        try {
            //los empleados no tienen permiso
            if (req.user?.rol === 'empleado') {
                return res.status(403).json({ msg: "No tienes permiso para eliminar usuarios." });
            }
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