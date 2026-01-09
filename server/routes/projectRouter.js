import express from 'express'
import { createNewProject } from '../controllers/projects.js'
const router = express.Router()
router.route('/new')
    .post(createNewProject)

export default router