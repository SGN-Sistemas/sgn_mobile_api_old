import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { SectorControllers } from '../../controllers/setorCompraControllers'

export const routerSector = express.Router()

const sectorControllers = new SectorControllers()

routerSector.get('/', isAuthenticatedAcess, sectorControllers.list)
