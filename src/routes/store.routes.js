import { Router } from 'express'
import {
  getStores,
  createStore,
  updateStore,
  deleteStore,
} from '../controllers/store.controller.js'

const router = Router()

/* GetRoutes */
router.get('/', getStores)

/* Post routes */
router.post('/', createStore)

/* Put routes */
router.put('/:id', updateStore)

/* Delete routes */
router.delete('/:id', deleteStore)

export default router
