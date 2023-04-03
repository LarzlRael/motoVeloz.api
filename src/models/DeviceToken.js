import { Schema, model } from 'mongoose'

const deviceTokenSchema = Schema(
  {
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)


export default model('DeviceToken', deviceTokenSchema)
