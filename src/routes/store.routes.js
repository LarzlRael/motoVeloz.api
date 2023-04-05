import { Router } from 'express'
import {
  getStores,
  createStore,
  updateStore,
  deleteStore,
  getOneStoreById,
  getOnlyUrlStoresAndName,
  findStoreByName,
} from '../controllers/store.controller.js'
import { verificateToken } from '../middlewares/jwtVerification.js'
import { body } from 'express-validator'

const router = Router()

/* GetRoutes */
router.get('/', getStores)
router.get('/getNamesAndUrl', getOnlyUrlStoresAndName)
router.get('/findStoreByName/:query', findStoreByName)
router.get('/:id', getOneStoreById)

/* Post routes */
router.post(
  '/',
  [
    body('storeName', 'Name is required').notEmpty(),
    body('storeUrl', 'Address is required').notEmpty().isURL(),
    verificateToken,
  ],
  createStore,
)

/* Put routes */
router.put(
  '/:id',
  [
    /* body('storeName', 'Name is required').notEmpty(),
    body('storeUrl', 'Address is required').notEmpty().isURL(), */
    verificateToken,
  ],
  updateStore,
)

/* Delete routes */
router.delete('/:id', verificateToken, deleteStore)

export default router
