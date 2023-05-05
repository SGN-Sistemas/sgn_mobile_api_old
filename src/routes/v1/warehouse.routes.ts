import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { WarehouseControllers } from '../../controllers/warehouseControllers'

export const routerWarehouse = express.Router()

const warehouseControllers = new WarehouseControllers()

routerWarehouse.get('/', isAuthenticatedAcess, warehouseControllers.list)
