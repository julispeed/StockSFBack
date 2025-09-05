import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool;

try {
  pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  console.log("✅ Pool de MySQL creado en Railway");
} catch (err) {
  console.error("❌ Error al conectar con MySQL:", err);
}

export default pool;
