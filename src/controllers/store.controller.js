import Store from '../models/Store.js'

export async function getStores(req, res, next) {
  try {
    const stores = await Store.find()
    res.json(stores)
  } catch (error) {
    next(error)
  }
}

export async function createStore(req, res, next) {
  const {
    shopName,
    shopPublicImageId,
    imageUrl,
    shopDescription,
    shopAddress,
    shopPhone,
    storeUrl,
  } = req.body
  try {
    const createdStore = await Store.create({
      shopName,
      shopPublicImageId,
      imageUrl,
      shopDescription,
      shopAddress,
      shopPhone,
      storeUrl,
    })
    await createdStore.save()
    res.status(201).json(createdStore)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al crear la tienda' })
  }
}

export async function updateStore(req, res, next) {
  const {
    shopName,
    shopPublicImageId,
    imageUrl,
    shopDescription,
    shopAddress,
    shopPhone,
    storeUrl,
  } = req.body
  const { id } = req.params
  try {
    const getStore = await Store.findById(id)
    if (!getStore) {
      res.status(404).json({ message: 'No existe la tienda' })
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
    await Store.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Tienda eliminada' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al eliminar la tienda la tienda' })
  }
}
