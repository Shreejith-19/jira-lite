import pool from '../config/db.js'
export async function connectDB(){
    try {
        const conn = await pool.getConnection()
        console.log("MySQL connected")
        conn.release()
    } catch (error) {
        console.error(`MySQL connection failed, ${error}`)
        throw error //to trigger .catch
    }
}