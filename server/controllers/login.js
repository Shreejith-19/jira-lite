import dotenv from "dotenv"
dotenv.config()
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import db from '../config/db.js'

export async function verifyUserAndLogin(req, res){
    //Login Procedure:
    /**
      1. get the req.body
      2. check if the user exists using the email
      3. then check the password
      4. create bearer token with an expiry
      5. send the bearer token to client with the response
      6. frontend will store the token in the local storage
     **/
    const {email, password} = req.body
    //input sanitization

    try{
        const [result] = await db.execute("select person_id, password_hash from person where email = ? limit 1", [email])
        //user does not exist
        if(result.length === 0){
            return res.status(404).json({errorMessage: "wrong email or password"})
        }
        const {person_id, password_hash} = result[0]
        const isMatch = await bcrypt.compare(password, password_hash)
        if(!isMatch){
            return res.status(404).json({errorMessage: "wrong email or password"})
        }
        const payload = {personId: person_id, email: email}
        const bearer_token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "3h"})
        return res.status(200).json({sucessMessage: "You are logged in", token : bearer_token})
    }catch(error){
        console.error(error)
        return res.status(500).json({"errorMessage": "server error"})
    }
    
}