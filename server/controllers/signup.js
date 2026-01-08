import bcrypt from "bcrypt"
import db from "../config/db.js"

export async function createUser(req, res){
    //signup procedure:
    /**
     1. get the req.body
     2. hash the password using bcrypt
     3. save the user
    **/
   try{
        const {username, email, password} = req.body
        //input sanitization

        const hashedPassword = await bcrypt.hash(password, 10)
        const signUpResult = await db.execute("insert into person(person_name, email, password_hash) values(?, ?, ?)", [username, email,   hashedPassword])
        return res.status(201).json({"successMessage": "user saved"})
   }catch(error){
        // 409 - duplicate entry
        // 500 - server error
        //400 - bad request
        console.error(error)
        return res.status(500).json({"errorMessage": "error saving the user"})
        
   }
}