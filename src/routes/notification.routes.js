import { Router } from 'express'
import {sendPushNotification} from '../controllers/notificationController'

const router = Router()

router.post('/sendNotification', sendPushNotification)

export default router
