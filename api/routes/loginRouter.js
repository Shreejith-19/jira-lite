import express from "express"
import { verifyUserAndLogin } from "../controllers/login.js"
const router = express.Router()
router.route("/")
    .post(verifyUserAndLogin)
export default router
