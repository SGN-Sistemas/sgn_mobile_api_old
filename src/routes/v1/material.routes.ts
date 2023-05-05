import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { MaterialControllers } from '../../controllers/materialControllers'

export const routerMaterial = express.Router()

const materialControllers = new MaterialControllers()

routerMaterial.get('/', isAuthenticatedAcess, materialControllers.list)
