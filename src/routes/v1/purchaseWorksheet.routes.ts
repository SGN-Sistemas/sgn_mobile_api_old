import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { PurchaseWorksheetControllers } from '../../controllers/purchaseWorksheet'

const routerPurchaseWorksheet = express.Router()

const purchaseworksheet = new PurchaseWorksheetControllers()

routerPurchaseWorksheet.get('/', isAuthenticatedAcess, purchaseworksheet.list)
routerPurchaseWorksheet.get('/codigo/:placCod', isAuthenticatedAcess, purchaseworksheet.listCod)
routerPurchaseWorksheet.get('/setorCompras/:secoCod', isAuthenticatedAcess, purchaseworksheet.listSeco)
routerPurchaseWorksheet.get('/funcionario/:pessCod', isAuthenticatedAcess, purchaseworksheet.listPess)
routerPurchaseWorksheet.get('/fornecedor/:placCod', isAuthenticatedAcess, purchaseworksheet.listForn)
routerPurchaseWorksheet.get('/solicitacao/:placCod', isAuthenticatedAcess, purchaseworksheet.listSoli)
routerPurchaseWorksheet.patch('/', isAuthenticatedAcess, purchaseworksheet.approval)
export default routerPurchaseWorksheet
