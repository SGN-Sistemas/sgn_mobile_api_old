import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { PageControllers } from '../../controllers/pageControllers'

export const routerPage = express.Router()

const pageControllers = new PageControllers()

routerPage.get('/', isAuthenticatedAcess, pageControllers.list)
