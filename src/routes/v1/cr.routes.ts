import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { CrControllers } from '../../controllers/crControllers'

export const routerCr = express.Router()

const crControllers = new CrControllers()

routerCr.get('/:almoCod', isAuthenticatedAcess, crControllers.list)
