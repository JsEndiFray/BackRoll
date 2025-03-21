import {validationResult} from "express-validator";
import registerServices from "../services/registerServices.js"


export default class RegisterControllers {


    //obtener los datos registrados
    static async getAllRegisters(req, res) {
        try {
            const users = await registerServices.getAllRegisters();
            if (!users) {
                return {error: 'No existe ningún usuario registrado'}
            }
            res.json(users);
        } catch (error) {
            console.error('Error en el registro', error);
            res.status(500).json({error: 'Error en obtener el registro de usuario'});

        }
    }

    //Búsqueda del usuario (todos)
    static async getUser(req, res) {
        try {
            const {username, email} = req.query
            //validamos unos de los criterios
            if (!username && !email) {
                return res.status(400).json({error: "Deber proporcionar un usuario o un email."});
            }
            const user = await registerServices.getUser(username, email);
            if (!user) {
                return res.status(404).json({msg: "Usuario no encontrado."})
            }
            res.status(200).json({msg: "Usuario encontrado:", user})

        } catch (error) {
            console.error('Error en la búsqueda', error);
            res.status(500).json({error: 'Error en obtener el registro de usuario'});
        }
    }

    // Obtener un usuario por ID
    static async getUserById(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({error: "ID es invalidado."});
            }
            const user = await registerServices.getUserById(id);
            if (!user) {
                return res.status(404).json({msg: `Usuario con ID ${id} no encontrado.`});
            }
            return res.status(200).json({msg: "ID encontrado:", user})


        } catch (error) {
            console.error('Error en la búsqueda', error);
            res.status(500).json({error: 'Error en obtener el id de usuario'});
        }

    }

    /*// nuevo registro
    static async createRegister(req, res) {
        try {
            const {username, password, rol, email} = req.body;
            const response = await registerServices.registerUser(username, password, rol, email);

            if (response.error) {
                return res.status(400).json({msg: response.error});
            }

            res.status(201).json({msg: "Usuario creado correctamente", response});
        } catch (error) {
            console.error("Error en createUserLogin:", error);
            res.status(500).json({msg: "Error al registrar usuario", error});
        }
    }


    static async login(req, res) {
        try {
            const {username, password} = req.body;
            const response = await registerServices.login(username, password);

            if (response.error) {
                return res.status(401).json({msg: response.error});
            }

            res.json({msg: "Inicio de sesión exitoso", token: response.token, user: response.user});
        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({msg: "Error en el servidor"});
        }
    }*/
}