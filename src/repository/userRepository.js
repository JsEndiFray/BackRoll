import db from '../DB/dbConnect.js';

export default class UserRepository {
    // Obtener todos los usuarios
    static async getAllUsers() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    // búsqueda por email, teléfono o por nombre y apellido
    static async findByEmail(email) {
        // Intentar buscar por email
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    }

    static async findByPhone(phone) {
        //busqueda por telefono
        const [rows] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    }

    static async findByNameAndLastname(name, lastname) {
        // Intentar buscar por nombre Y apellido (coincidencia exacta)
        const [rows] = await db.query('SELECT * FROM users WHERE name = ? AND lastname= ?', [name, lastname]);
        if (rows.length > 0) {
            return rows[0]; // Si se encuentra, lo retorna
        }
        return null;
    }


    // Obtener un usuario por ID
    static async getUserById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    }


    // verifica si el nuevo usuario existe
    static async findByEmailOrPhone(email, phone) {
        const [rows] = await db.query('SELECT * FROM users WHERE email=? OR phone=? ', [email, phone])
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    }

    // Crear un nuevo usuario
    static async createUser(user) {
        const {name, lastname, email, phone, rol, message} = user;
        const [rows] = await db.query('INSERT INTO users (name, lastname, email, phone, rol, message, date_create, date_update)' +
            ' VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [name, lastname, email, phone, rol, message]);
        return rows.insertId;
    }

    //actualizar el usuario
     static async updateUser(user) {
         const {id, name, lastname, email, phone, rol, message} = user;
         const [result] = await db.query
         (`UPDATE users SET name=?, lastname=?, email=?, phone=?, rol=?, message=?, date_update=NOW() WHERE id = ?`,
             [name, lastname, email, phone, rol, message, id]
         );
         return result.affectedRows > 0;
     }
}