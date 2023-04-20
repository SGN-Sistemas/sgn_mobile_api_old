import { Request, Response } from 'express';
import { ListPurchaseOrderService } from '../services/purchase_order/listPurchaseOrder';
import { ApprovalPurchaseOrderService } from '../services/purchase_order/approvalPurchaseOrder';
import { ListPurchaseOrderNumberService } from '../services/purchase_order/listPurchaseOrderNumber';
import { ListPurchaseOrderWarehouseService } from '../services/purchase_order/listPurchaseOrderAlmoxa';
import { ListPurchaseOrderPurchasingSector } from '../services/purchase_order/listPurchaseOrderPurchasingSector';
import { ListPurchaseOrderCrService } from '../services/purchase_order/listPurchaseOrderCR';
import { ListPurchaseOrderDateService } from '../services/purchase_order/listPurchaseOrderDate';

export class PurchaseOrderController {
  public async list (request: Request, response: Response) {
    const userId = request.user.USUA_COD;

    const listPurchaseOrderService = new ListPurchaseOrderService();

    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(userId);

    response.json(listPurchaseOrderServiceExec);
  }

  public async approvalOrderPurchase (request: Request, response: Response) {
    const userId = request.user.USUA_COD;

    const approvalPurchaseOrderService = new ApprovalPurchaseOrderService();

    const {
      USUA_SENHA_APP,
      arraySolicitacaoCompra
    } = request.body;

    let soliCompraTxt = '';

    arraySolicitacaoCompra.forEach(async (item: any) => {
      soliCompraTxt = `${soliCompraTxt} ${item[2]}`;

      await approvalPurchaseOrderService.execute(
        userId,
        USUA_SENHA_APP,
        item[1],
        item[0],
        item[3]
      );
    });

    return response.status(200).json({
      message: 'Solicitações aprovadas com sucesso',
      error: false,
      status: 200
    });
  }

  public async listFilerNumber (request: Request, response: Response) {
    const userId = request.user.USUA_COD;

    const { numeroSoco } = request.params;

    const listPurchaseOrderNumberService = new ListPurchaseOrderNumberService();

    const listPurchaseOrderNumberServiceExec = await listPurchaseOrderNumberService.execute(userId, numeroSoco);

    response.json(listPurchaseOrderNumberServiceExec);
  }

  public async listFilerWarehouse (request: Request, response: Response) {
    const userId = request.user.USUA_COD;
    const { almoDesc } = request.params;

    const listPurchaseOrderWarehouseService = new ListPurchaseOrderWarehouseService();

    const listPurchaseOrderWarehouseServiceExec =
      await listPurchaseOrderWarehouseService
        .execute(userId, almoDesc);

    response.json(listPurchaseOrderWarehouseServiceExec);
  }

  public async listFilerPurchasingSector (request: Request, response: Response) {
    const userId = request.user.USUA_COD;

    const { secoDesc } = request.params;

    const listPurchaseOrderPurchasingSector = new ListPurchaseOrderPurchasingSector();

    const listPurchaseOrderPurchasingSectorExec = await listPurchaseOrderPurchasingSector.execute(userId, secoDesc);

    response.json(listPurchaseOrderPurchasingSectorExec);
  }

  public async listFilerCr (request: Request, response: Response) {
    const userId = request.user.USUA_COD;

    const { cereDesc } = request.params;

    const listPurchaseOrderCrService = new ListPurchaseOrderCrService();

    const listPurchaseOrderCrServiceExec = await listPurchaseOrderCrService.execute(userId, cereDesc);

    response.json(listPurchaseOrderCrServiceExec);
  }

  public async listFilerDate(request: Request, response: Response) {
    const userId = request.user.USUA_COD;

    const { data } = request.params;

    const listPurchaseOrderDateService = new ListPurchaseOrderDateService();

    const listPurchaseOrderDateServiceExec = await listPurchaseOrderDateService.execute(userId, data);

    response.json(listPurchaseOrderDateServiceExec);
  }
}
