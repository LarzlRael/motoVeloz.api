import DeviceToken from '../models/DeviceToken.js'
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
  const { title, body, token } = req.body
  const sendData = {
    to: token,
    notification: {
      title,
      body,
    },
  }
  try {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Authorization: `key=${process.env.FIREBASE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function saveDeviceId(req, res) {
  const { token } = req.params
  const isTokenExists = DeviceToken.findOne({ token })

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
