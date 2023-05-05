import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { UnidMatControllers } from '../../controllers/unidMatControllers'

export const routerUnidMat = express.Router()

const unidmatControllers = new UnidMatControllers()

routerUnidMat.get('/', isAuthenticatedAcess, unidmatControllers.list)
