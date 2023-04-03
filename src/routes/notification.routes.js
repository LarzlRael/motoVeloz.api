import { Router } from 'express'
import {
  createNotification,
  deleteNotification,
  editNotification,
  getNotifications,
  saveDeviceId,
  sendPushNotification,
} from '../controllers/notificationController.js'
import { verificateToken } from '../middlewares/jwtVerification.js'

const router = Router()

/* Get routes */
router.get('/saveDeviceId/:token', saveDeviceId)
router.get('/getNotifications', verificateToken, getNotifications)
/* Post Routes */
router.post('/sendNotification', verificateToken, sendPushNotification)
router.post('/createNotification', verificateToken, createNotification)

/* Put Routes */
router.put('/updateNotification/:id', verificateToken, editNotification)
/* Delete Routes */
router.delete('/deleteNotification/:id', verificateToken, deleteNotification)

export default router
