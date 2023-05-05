import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { GuysControllers } from '../../controllers/guysControllers'

export const routerGuys = express.Router()

const guysControllers = new GuysControllers()

routerGuys.get('/', isAuthenticatedAcess, guysControllers.list)
