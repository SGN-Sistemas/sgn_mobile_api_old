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

  public async addPurchase (request: Request, response: Response) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

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
      console.log('====================================')
      console.log(element[0].mateUnidMatCod)
      console.log('====================================')
      const unmaCod = element[0].mateUnidMatCod
      const qtd = element[0].mateQuantidade
      const mateCod = element[0].mateCod
      const servCod = element[0].servCod
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
        token: acessToken
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
