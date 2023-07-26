import express from 'express'
import { PurchaseOrderController } from '../../controllers/purchaseOrderController'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'

export const routerPurchaseOrder = express.Router()

const purchaseOrderController = new PurchaseOrderController()

routerPurchaseOrder.get('/', isAuthenticatedAcess, purchaseOrderController.list)
routerPurchaseOrder.patch('/', isAuthenticatedAcess, purchaseOrderController.approvalOrderPurchase)
routerPurchaseOrder.get('/numero/:numeroSoco', isAuthenticatedAcess, purchaseOrderController.listFilerNumber)
routerPurchaseOrder.get('/almoxarifado/:almoDesc', isAuthenticatedAcess, purchaseOrderController.listFilerWarehouse)
routerPurchaseOrder.get('/setorCompras/:secoDesc', isAuthenticatedAcess, purchaseOrderController.listFilerPurchasingSector)
routerPurchaseOrder.get('/cr/:crCod', isAuthenticatedAcess, purchaseOrderController.listFilerCr)
routerPurchaseOrder.get('/data/:data', isAuthenticatedAcess, purchaseOrderController.listFilerDate)
routerPurchaseOrder.post('/create', isAuthenticatedAcess, purchaseOrderController.addPurchase)
