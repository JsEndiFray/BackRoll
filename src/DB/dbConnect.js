import mysql2 from "mysql2/promise";

process.loadEnvFile();


const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const CheckConnection = async ()=>{
    try{
        const connection = await db.getConnection();
        console.log('Conectado correctamente a MYSQL');
        connection.release();
    }catch (error){
        console.error('Error de conexión a MYSQL', error);
        process.exit(1);// cierre de aplicación, evita que siga ejecutándose
    }
}

CheckConnection();


export default db;