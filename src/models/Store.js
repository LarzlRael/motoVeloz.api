import { Schema, model } from 'mongoose'

const StoreSchema = Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    storeUrl: {
      type: String,
      required: true,
    },
    storePublicImageId: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
    },
    storeDescription: {
      type: String,
    },
    storeAddress: {
      type: String,
    },
    storePhone: {
      type: String,
    },
    storeVisiblity: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default model('Store', StoreSchema)
