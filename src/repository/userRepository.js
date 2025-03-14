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
        return rows[0] || null;
    }

    static async findByPhone(phone) {
        //búsqueda por teléfono
        const [rows] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
        return rows[0] || null;
    }

    static async findByNameAndLastname(name, lastname) {
        // Intentar buscar por nombre Y apellido (coincidencia exacta)
        const [rows] = await db.query('SELECT * FROM users WHERE name = ? AND lastname= ?', [name, lastname]);
        return rows[0] || null;
    }


    // Obtener un usuario por ID
    static async getUserById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0] || null;
    }


    // verifica si el nuevo usuario existe
    static async findByEmailOrPhone(email, phone) {
        const [rows] = await db.query('SELECT * FROM users WHERE email=? OR phone=? ', [email, phone])
        return rows[0] || null;
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

     //eliminar el usuario creado
    static async deleteUser(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}