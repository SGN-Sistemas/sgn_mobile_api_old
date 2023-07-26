import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { SupplierControllers } from '../../controllers/supplierControllers'

export const routerSupplier = express.Router()

const supplierControllers = new SupplierControllers()

routerSupplier.get('/', isAuthenticatedAcess, supplierControllers.list)
