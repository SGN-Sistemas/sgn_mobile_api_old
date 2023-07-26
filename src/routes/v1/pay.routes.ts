import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { PayControllers } from '../../controllers/payControllers'

export const routerPay = express.Router()

const payControllers = new PayControllers()

routerPay.get('/', isAuthenticatedAcess, payControllers.list)
routerPay.post('/', isAuthenticatedAcess, payControllers.approval)
routerPay.get('/numeroDoc/:trpgNumDoc', isAuthenticatedAcess, payControllers.listNumDoc)
routerPay.get('/periodo/:dtIni/:dtEnd', isAuthenticatedAcess, payControllers.listPeriod)
routerPay.get('/cr/:cereCod', isAuthenticatedAcess, payControllers.listCere)
routerPay.get('/numero/:trpgCod', isAuthenticatedAcess, payControllers.listNum)
routerPay.get('/fornecedor/:fornCod', isAuthenticatedAcess, payControllers.listForn)
