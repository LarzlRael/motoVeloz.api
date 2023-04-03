
import axios from 'axios'
import DeviceToken from '../models/DeviceToken.js'
import Notification from '../models/Notification.js'
/*
export interface IpushNotification {
  to?: string;
  registration_ids?: string[];
  condition?: string;
  collapse_key?: string;
  priority?: string;
  content_available?: boolean;
  mutable_content?: any;
  time_to_live?: number;
  restricted_package_name?: string;
  dry_run?: boolean;

  data?: any;
  notification?: INotification;
}

interface INotification {
  title?: string;
  body?: string;
  android_channel_id?: string;
  icon?: string;
  sound?: string;
  tag?: string;
  color?: string;
  click_action?: string;
  body_loc_key?: string;
  title_loc_key?: string;
}
 */

export async function sendPushNotification(req, res) {
  const getDevicesIds = await DeviceToken.find()
  const devicesIds = getDevicesIds.map((device) => device.token)
  console.log(devicesIds)
  const { title, body, imageUrl } = req.body
  const sendData = {
    registration_ids: devicesIds,
    notification: {
      title,
      body,
      image: imageUrl,
    },
  }
  try {
    const notification = await axios({
      method: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      data: sendData,
      headers: {
        Authorization: `key=${process.env.FIREBASE_TOKEN}`,
      },
    })
    console.log(notification.data);
    res.status(200).json({ message: 'Notification sent' })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(error)
  }
}

export async function saveDeviceId(req, res) {
  const { token } = req.params

  const isTokenExists = await DeviceToken.findOne({ token })
  console.log(isTokenExists)
  try {
    if (isTokenExists) {
      return res.status(200).json({ message: 'Token already exists' })
    }
    const deviceToken = DeviceToken({
      token,
    })
    await deviceToken.save()
    res.status(200).json({ message: 'Token saved' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function createNotification(req, res) {
  const { title, body, imageUrl } = req.body
  console.log(title, body, imageUrl)
  const notification = Notification({
    title,
    body,
    imageUrl,
  })
  try {
    await notification.save()
    res.status(200).json({ message: 'Notification created' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find()
    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function editNotification(req, res) {
  try {
    const notification = await Notification.findById(req.params.id)
    if (notification) {
      notification.title = req.body.title
      notification.body = req.body.body
      notification.urlImage = req.body.urlImage
      const notificationSaved = await notification.save()
      res.status(200).json(notificationSaved)
    } else {
      res.status(404).json({ message: 'Notification not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export async function deleteNotification(req, res) {
  try {
    const notification = await Notification.findById(req.params.id)
    if (notification) {
      await Notification.deleteOne({ _id: req.params.id })
      res.status(200).json({ message: 'Notification deleted' })
    } else {
      res.status(404).json({ message: 'Notification not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
