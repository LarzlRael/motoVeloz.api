import { Schema, model } from 'mongoose'

const notificationSchema = Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String },
    publicImageId: { type: String },
  },
  {
    timestamps: true, 
  },
)

export default model('Notification', notificationSchema)
