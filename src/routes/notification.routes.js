import { Router } from 'express'
import {
  saveDeviceId,
  sendPushNotification,
} from '../controllers/notificationController.js'
import { verificateToken } from '../middlewares/jwtVerification.js'

const router = Router()

/* Get routes */
router.get('/saveDeviceId/:token', saveDeviceId)

/* Post Routes */
router.post('/sendNotification', verificateToken, sendPushNotification)

export default router
