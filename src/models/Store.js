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
      required: true,
    },
    storeDescription: {
      type: String,
      required: true,
    },
    storeAddress: {
      type: String,
      /* required: true, */
    },
    storePhone: {
      type: String,
      /* required: true, */
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
