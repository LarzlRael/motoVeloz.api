import { Schema, model } from 'mongoose'

const StoreSchema = Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    shopPublicImageId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    shopDescription: {
      type: String,
      required: true,
    },
    shopAddress: {
      type: String,
      required: true,
    },
    shopPhone: {
      type: String,
      required: true,
    },
    storeUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default model('Store', StoreSchema)
