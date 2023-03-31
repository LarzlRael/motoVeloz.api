import { Router } from 'express'
import {
  getStores,
  createStore,
  updateStore,
  deleteStore,
  getOneStoreById,
} from '../controllers/store.controller.js'

const router = Router()

/* GetRoutes */
router.get('/', getStores)
router.get('/:id', getOneStoreById)

/* Post routes */
router.post('/', createStore)

/* Put routes */
router.put('/:id', updateStore)

/* Delete routes */
router.delete('/:id', deleteStore)

export default router
