import { Request, Response } from 'express'
import { ListPayService } from '../services/pay/listService'
import { ApprovalPayService } from '../services/pay/approval'

export class PayControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listPayService = new ListPayService()

    const listPayServiceExec = await listPayService.execute(request.user_cod, '', request.database)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async listForn (request: Request, response: Response): Promise<Response> {
    const { fornCod } = request.params

    const queryString = `
      AND
        FORN_COD = ${fornCod}
    `

    const listPayService = new ListPayService()

    const listPayServiceExec = await listPayService.execute(request.user_cod, queryString, request.database)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async listCere (request: Request, response: Response): Promise<Response> {
    const { cereCod } = request.params

    const queryString = `
      AND
        CERE_COD = ${cereCod}
    `

    const listPayService = new ListPayService()

    const listPayServiceExec = await listPayService.execute(request.user_cod, queryString, request.database)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async listNum (request: Request, response: Response): Promise<Response> {
    const listPayService = new ListPayService()

    const { trpgCod } = request.params

    const queryString = `
      AND
        TRPG_COD = ${trpgCod}
    `

    const listPayServiceExec = await listPayService.execute(request.user_cod, queryString, request.database)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async listNumDoc (request: Request, response: Response): Promise<Response> {
    const listPayService = new ListPayService()

    const { trpgNumDoc } = request.params

    const queryString = `
      AND
        TRPG_NUM_DOC = '${trpgNumDoc}'
    `

    const listPayServiceExec = await listPayService.execute(request.user_cod, queryString, request.database)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async listPeriod (request: Request, response: Response): Promise<Response> {
    const listPayService = new ListPayService()

    const { dtIni, dtEnd } = request.params

    const queryString = `
      AND
        trpp_dtvenc >= '${dtIni}'
      AND 
        trpp_dtvenc <= '${dtEnd}'
    `

    const listPayServiceExec = await listPayService.execute(request.user_cod, queryString, request.database)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const approvalPayService = new ApprovalPayService()

    const { password, arrayPay } = request.body

    let status = 200
    const message = []

    for await (const item of arrayPay) {
      const approvalPayServiceExec = await approvalPayService.execute(request.user_sigla, item.trppCod, item.cereCod, item.valor, password, request.database)
      message.push(approvalPayServiceExec.message)
      if (approvalPayServiceExec.error === true) {
        status = 400
      }
    }

    return response.status(status).json(message)
  }
}
