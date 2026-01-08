import express from 'express'
const router = express.Router()
router.route('/api/projects/new')
    .post()

export default router