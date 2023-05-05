import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ServicesControllers } from '../../controllers/serviceControllers'

export const routerServices = express.Router()

const servicesControllers = new ServicesControllers()

routerServices.get('/', isAuthenticatedAcess, servicesControllers.list)
