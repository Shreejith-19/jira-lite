import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { connectDB } from './helper/db_connection.js'

const PORT = process.env.PORT
const app = express()

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}...`)
})}).catch((error) =>{
    console.error(error)
})