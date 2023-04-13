import { Router } from 'express'
import { login, register, verifyToken } from '../controllers/auth.controller.js'
const router = Router()

/* Get routes */
router.get('/verifyToken', verifyToken)

/* Post Routes */
router.post('/login', login)
/* router.post('/register', register) */

export default router
