import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { PurchaseWorksheetControllers } from '../../controllers/purchaseWorksheet'

const routerPurchaseWorksheet = express.Router()

const purchaseworksheet = new PurchaseWorksheetControllers()

routerPurchaseWorksheet.get('/', isAuthenticatedAcess, purchaseworksheet.list)

export default routerPurchaseWorksheet
