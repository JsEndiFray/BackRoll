import db from '../DB/dbConnect.js'
import bcrypt from "bcryptjs";

export default class registerRepository {
    //obtener datos de los registros
    static async getUserByUserRegister(username) {
        try {
            const [result] = await db.query('SELECT * FROM data_register WHERE username = ?', [username]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error al consultar con la base de datos', error)
            return null;
        }
    }

    static async createUserRegister(user_id, username, password, rol) {
        try {
            const {username} = user_id;
            //verificar si un registro existe
            const [existingRegister] = await db.query('SELECT * FROM data_register WHERE username = ?', [username]);
            if (existingRegister) {
                return {error: 'El usuario ya existe', data: existingRegister};
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query('INSERT INTO data_register (user_id, username, password, email, rol, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', [user_id, username, hashedPassword, rol]);
            return result.insertId;
        } catch (error) {
            console.error('Error crear el usuario', error);
            return null;
        }
    }
}
