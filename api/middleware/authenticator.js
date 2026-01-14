import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export function authenticateUser(req, res, next){
    //procedure:
    /** 
    1. first we need to get the encoded token from the authorization header
    2. verify the token with the secret key
    3. jwt.verify decodes the token, checks expiry, verifie signature, it will give you the decoded payload
    4.  add the personId to the req object
    **/
   try {
    const rawToken = req.headers.authorization// bearer <token>
    const encodedPayload = rawToken.split(" ")[1]
    const decodedPaylaod = jwt.verify(encodedPayload, process.env.JWT_SECRET_KEY)
    req.user = decodedPaylaod //personId, email
    next()
   } catch (error) {
    console.error(error)
    return res.status(401).json({errorMessage: "user not logged in"})

   }
}