import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ItemPgcControllers } from '../../controllers/itemPcgControllers'

export const routerItemPgc = express.Router()

const itempgcControllers = new ItemPgcControllers()

routerItemPgc.get('/:plgcCod/:trcrCod/:cereCod', isAuthenticatedAcess, itempgcControllers.list)
