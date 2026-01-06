import dotenv from "dotenv"
dotenv.config()
import express from "express"

import { connectDB } from './helper/db_connection.js'
import signupRouter from "./routes/signupRouter.js"

const PORT = process.env.PORT
const app = express()

//middlewares
app.use(express.urlencoded({extended: true}))

//routing
app.use("/api/signup", signupRouter)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}...`)
})}).catch((error) =>{
    console.error(error)
})