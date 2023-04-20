import { Router } from 'express';
import { PurchaseOrderController } from '../../controllers/purchaseOrderController';

export const routerPurchaseOrder = Router();

const purchaseOrderController = new PurchaseOrderController();

routerPurchaseOrder.get('/', purchaseOrderController.list);
routerPurchaseOrder.patch('/', purchaseOrderController.approvalOrderPurchase);
routerPurchaseOrder.get('/numero/:numeroSoco', purchaseOrderController.listFilerNumber);
routerPurchaseOrder.get('/almoxarifado/:almoDesc', purchaseOrderController.listFilerWarehouse);
routerPurchaseOrder.get('/setorCompras/:secoDesc', purchaseOrderController.listFilerPurchasingSector);
routerPurchaseOrder.get('/cr/:cereDesc', purchaseOrderController.listFilerCr);
routerPurchaseOrder.get('/data/:data', purchaseOrderController.listFilerDate);
