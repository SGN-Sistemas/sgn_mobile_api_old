/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { ListPurchaseOrderService } from '../services/purchase_order/listPurchaseOrder'
import { ApprovalPurchaseOrderService } from '../services/purchase_order/approvalPurchaseOrder'
import { ListPurchaseOrderNumberService } from '../services/purchase_order/listPurchaseOrderNumber'
import { ListPurchaseOrderWarehouseService } from '../services/purchase_order/listPurchaseOrderAlmoxa'
import { ListPurchaseOrderPurchasingSector } from '../services/purchase_order/listPurchaseOrderPurchasingSector'
import { ListPurchaseOrderCrService } from '../services/purchase_order/listPurchaseOrderCR'
import { ListPurchaseOrderDateService } from '../services/purchase_order/listPurchaseOrderDate'
import { CreatePurchase } from '../services/purchase_order/createPurchase'

export class PurchaseOrderController {
  public async list (request: Request, response: Response) {
    const listPurchaseOrderService = new ListPurchaseOrderService()

    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(request.user_cod, request.database)

    response.status(listPurchaseOrderServiceExec.status).json(listPurchaseOrderServiceExec.message)
  }

  public async approvalOrderPurchase (request: Request, response: Response) {
    const approvalPurchaseOrderService = new ApprovalPurchaseOrderService()

    const {
      USUA_SENHA_APP,
      arraySolicitacaoCompra
    } = request.body

    let status = 200

    const message: string[] = []

    for await (const item of arraySolicitacaoCompra) {
      const execute = await approvalPurchaseOrderService.execute(
        request.user_sigla,
        USUA_SENHA_APP,
        item.pos,
        item.socoCod,
        item.valTotal,
        request.database
      )

      if (execute.error) {
        status = execute.status
      }

      message.push(execute.message)
    }

    return response.status(status).json({
      message,
      status
    })
  }

  public async listFilerNumber (request: Request, response: Response) {
    const { numeroSoco } = request.params

    const listPurchaseOrderNumberService = new ListPurchaseOrderNumberService()

    const listPurchaseOrderNumberServiceExec = await listPurchaseOrderNumberService.execute(request.user_cod, numeroSoco, request.database)

    response.status(listPurchaseOrderNumberServiceExec.status).json(listPurchaseOrderNumberServiceExec.message)
  }

  public async listFilerWarehouse (request: Request, response: Response) {
    const { almoDesc } = request.params

    const listPurchaseOrderWarehouseService = new ListPurchaseOrderWarehouseService()

    const listPurchaseOrderWarehouseServiceExec = await listPurchaseOrderWarehouseService.execute(request.user_cod, almoDesc, request.database)

    response.status(listPurchaseOrderWarehouseServiceExec.status).json(listPurchaseOrderWarehouseServiceExec.message)
  }

  public async listFilerPurchasingSector (request: Request, response: Response) {
    const { secoDesc } = request.params

    const listPurchaseOrderPurchasingSector = new ListPurchaseOrderPurchasingSector()

    const listPurchaseOrderPurchasingSectorExec = await listPurchaseOrderPurchasingSector.execute(request.user_cod, secoDesc, request.database)

    response.status(listPurchaseOrderPurchasingSectorExec.status).json(listPurchaseOrderPurchasingSectorExec.message)
  }

  public async listFilerCr (request: Request, response: Response) {
    const { cereDesc } = request.params

    const listPurchaseOrderCrService = new ListPurchaseOrderCrService()

    const listPurchaseOrderCrServiceExec = await listPurchaseOrderCrService.execute(request.user_cod, cereDesc, request.database)

    response.status(listPurchaseOrderCrServiceExec.status).json(listPurchaseOrderCrServiceExec.message)
  }

  public async listFilerDate (request: Request, response: Response) {
    const { data } = request.params

    const listPurchaseOrderDateService = new ListPurchaseOrderDateService()

    const listPurchaseOrderDateServiceExec = await listPurchaseOrderDateService.execute(request.user_cod, data, request.database)

    response.status(listPurchaseOrderDateServiceExec.status).json(listPurchaseOrderDateServiceExec.message)
  }

  public async addPurchase (request: Request, response: Response) {
    const {
      secoCod,
      itpcCod,
      cereCod,
      almoCod,
      dtNece,
      arrayMaterial,
      pessCodSoli,
      ass1,
      ass2
    } = request.body
    const message: string[] = []
    let status = 200
    let error = false
    const create = new CreatePurchase()
    for await (const element of arrayMaterial) {
      const cod = request.user_cod
      const unmaCod = element.mateUnidMatCod
      const qtd = element.mateQuantidade
      const mateCod = element.mateCod
      const servCod = element.servCod
      const createExec = await create.execute({
        secoCod,
        servCod,
        itpcCod,
        cereCod,
        unmaCod,
        almoCod,
        dtNece,
        qtd,
        mateCod,
        pessCodSoli,
        ass1,
        ass2,
        cod,
        database: request.database
      })
      if (createExec.error === true) {
        status = 400
        error = true
      }
      message.push(createExec.message)
    }
    response.status(status).json({
      message,
      status,
      error
    })
  }
}
