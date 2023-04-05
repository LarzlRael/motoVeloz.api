import { validationResult } from 'express-validator'
import Store from '../models/Store.js'
import { verifyErrors } from '../utils/validation.js'
import cloudinary from '../utils/cloudinaryConfig.js'

export async function getStores(req, res, next) {
  try {
    const stores = await Store.find()
    res.json(stores)
  } catch (error) {
    next(error)
  }
}
export async function getOneStoreById(req, res, next) {
  const { id } = req.params
  try {
    const store = await Store.findById(id)
    res.json(store)
  } catch (error) {
    next(error)
  }
}

export async function createStore(req, res, next) {
  verifyErrors(req)
  const file = req.file

  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'motoVeloz',
    })
    req.body.imageUrl = result.secure_url
    req.body.storePublicImageId = result.public_id
  }
  try {
    const createdStore = await Store.create({
      ...req.body,
    })
    await createdStore.save()
    res.status(201).json(createdStore)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al crear la tienda' })
  }
}

export async function updateStore(req, res, next) {
  verifyErrors(req)
  const file = req.file
  const { id } = req.params
  try {
    const getStore = await Store.findById(id)
    if (!getStore) {
      res.status(404).json({ message: 'No existe la tienda' })
    }
    if (file) {
      if (getStore.storePublicImageId) {
        await cloudinary.uploader.destroy(getStore.storePublicImageId)
      }
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'motoVeloz',
      })
      req.body.imageUrl = result.secure_url
      req.body.storePublicImageId = result.public_id
    }
    const updatedStore = await Store.findByIdAndUpdate(id, {
      ...req.body,
    })
    res.status(200).json(updatedStore)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al Actualizar la tienda la tienda' })
  }
}
export async function deleteStore(req, res, next) {
  const { id } = req.params
  try {
    const getStore = await Store.findById(id)
    if (!getStore) {
      res.status(404).json({ message: 'No existe la tienda' })
    }
    /* delete store */
    if (getStore.storePublicImageId) {
      await cloudinary.uploader.destroy(getStore.storePublicImageId)
    }
    await Store.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Tienda eliminada' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al eliminar la tienda la tienda' })
  }
}

export async function findStoreByName(req, res, next) {
  const { query } = req.params
  console.log(query)
  try {
    const getSearchStores = await Store.find({
      storeName: { $regex: new RegExp(query.toLowerCase(), 'i') },
    })
    console.log(getSearchStores)
    /* if (getStores || getStores.length === 0) {
      return await getStores(req, res, next)
    } */

    return res.status(200).json(getSearchStores)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al buscar la tienda' })
  }
}
export async function getOnlyUrlStoresAndName(req, res, next) {
  try {
    const stores = await Store.find({}, { storeName: 1, imageUrl: 1 })
    res.json(stores)
  } catch (error) {
    next(error)
  }
}
