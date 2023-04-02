import { Schema, model } from 'mongoose'

const deviceTokenSchema = Schema(
  {
    deviceToken: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)


export default model('DeviceToken', deviceTokenSchema)
