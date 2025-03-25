import db from '../DB/dbConnect.js'


export default class registerRepository {
    //obtener datos de los registros
    static async getAllRegister() {
        const [rows] = await db.query('SELECT * FROM register');
        return rows;
    }

    //Búsqueda del usuario existente por usuario o email
    static async findByUsernameOrEmail(username, email) {
        const [rows] = await db.query('SELECT * FROM register WHERE username = ? OR email = ?', [username, email]);
        return rows[0] || null;
    }


    // Obtener un usuario por ID
    static async getUserById(id) {
        const [rows] = await db.query('SELECT * FROM register WHERE id = ?', [id]);
        return rows[0] || null;
    }

    // crea el username
    static async createUserName(userData) {
        const {user_id, username, password, email, rol} = userData;
        const [rows] = await db.query('INSERT INTO register (user_id, username, password, email, rol, date_create, date_update) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', [user_id, username, password, email, rol]);
        return rows.insertId;
    }
    // 🔹 Actualizar usuario (puede incluir o no la contraseña)
    static async updateRegister(userData) {
        const { username, password, email, rol } = userData;

        if (password) {
            // se quiere actualizar la contraseña
            const [result] = await db.query(
                'UPDATE register SET password = ?, email = ?, rol = ?, date_update = NOW() WHERE username = ?',
                [password, email, rol, username]
            );
            return result.affectedRows;
        } else {
            //  no se actualiza la contraseña
            const [result] = await db.query(
                'UPDATE register SET rol = ?, date_update = NOW() WHERE username = ?',
                [email, rol, username]
            );
            return result.affectedRows;
        }
    }
    //eliminar el usuario
    static async deleteRegister(registerId) {
        const [result] = await db.query('DELETE FROM register WHERE id = ?', [registerId]);
        return result.affectedRows;
    }

}
