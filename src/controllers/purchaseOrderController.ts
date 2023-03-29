/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { ListPurchaseOrderService } from '../services/purchase_order/listPurchaseOrder'
import { ApprovalPurchaseOrderService } from '../services/purchase_order/approvalPurchaseOrder'
import { ListPurchaseOrderNumberService } from '../services/purchase_order/listPurchaseOrderNumber'
import { ListPurchaseOrderWarehouseService } from '../services/purchase_order/listPurchaseOrderAlmoxa'
import { ListPurchaseOrderPurchasingSector } from '../services/purchase_order/listPurchaseOrderPurchasingSector'
import { ListPurchaseOrderCrService } from '../services/purchase_order/listPurchaseOrderCR'
import { ListPurchaseOrderDateService } from '../services/purchase_order/listPurchaseOrderDate'

export class PurchaseOrderController {
  public async list (request: Request, response: Response) {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listPurchaseOrderService = new ListPurchaseOrderService()

    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(acessToken)

    response.json(listPurchaseOrderServiceExec)
  }

  public async approvalOrderPurchase (request: Request, response: Response) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const approvalPurchaseOrderService = new ApprovalPurchaseOrderService()

    const {
      USUA_SENHA_APP,
      arraySolicitacaoCompra
    } = request.body

    let soliCompraTxt = ''

    arraySolicitacaoCompra.forEach(async (item: any) => {
      soliCompraTxt = `${soliCompraTxt} ${item[2]}`

      await approvalPurchaseOrderService.execute(
        acessToken,
        USUA_SENHA_APP,
        item[1],
        item[0],
        item[3]
      )
    })

    return response.status(200).json({
      message: 'Solicitações aprovadas com sucesso',
      error: false,
      status: 200
    })
  }

  public async listFilerNumber (request: Request, response: Response) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const { numeroSoco } = request.params

    const listPurchaseOrderNumberService = new ListPurchaseOrderNumberService()

    const listPurchaseOrderNumberServiceExec = await listPurchaseOrderNumberService.execute(acessToken, numeroSoco)

    response.json(listPurchaseOrderNumberServiceExec)
  }

  public async listFilerWarehouse (request: Request, response: Response) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const { almoDesc } = request.params

    const listPurchaseOrderWarehouseService = new ListPurchaseOrderWarehouseService()

    const listPurchaseOrderWarehouseServiceExec = await listPurchaseOrderWarehouseService.execute(acessToken, almoDesc)

    response.json(listPurchaseOrderWarehouseServiceExec)
  }

  public async listFilerPurchasingSector (request: Request, response: Response) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const { secoDesc } = request.params

    const listPurchaseOrderPurchasingSector = new ListPurchaseOrderPurchasingSector()

    const listPurchaseOrderPurchasingSectorExec = await listPurchaseOrderPurchasingSector.execute(acessToken, secoDesc)

    response.json(listPurchaseOrderPurchasingSectorExec)
  }

  public async listFilerCr (request: Request, response: Response) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const { cereDesc } = request.params

    const listPurchaseOrderCrService = new ListPurchaseOrderCrService()

    const listPurchaseOrderCrServiceExec = await listPurchaseOrderCrService.execute(acessToken, cereDesc)

    response.json(listPurchaseOrderCrServiceExec)
  }

  public async listFilerDate (request: Request, response: Response) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const { data } = request.params

    const listPurchaseOrderDateService = new ListPurchaseOrderDateService()

    const listPurchaseOrderDateServiceExec = await listPurchaseOrderDateService.execute(acessToken, data)

    response.json(listPurchaseOrderDateServiceExec)
  }
}
