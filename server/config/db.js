import mysql2 from "mysql2/promise" // '/promise' for async-await based try-catch based code
import dotenv from "dotenv"
dotenv.config() //why are we calling dotenv.config here? when we already called it in index.js?

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
})

export default pool //use default when there is only one export