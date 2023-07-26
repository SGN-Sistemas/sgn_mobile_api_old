import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { LocalControllers } from '../../controllers/localControllers'

export const routerLocal = express.Router()

const localControllers = new LocalControllers()

routerLocal.get('/', isAuthenticatedAcess, localControllers.list)
