import { Request, Response } from 'express'
import { ListPayService } from '../services/pay/listService'
import { ApprovalPayService } from '../services/pay/approval'

export class PayControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listPayService = new ListPayService()

    const listPayServiceExec = await listPayService.execute(acessToken, '')
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async listForn (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { fornCod } = request.params

    console.log('====================================')
    console.log(fornCod)
    console.log('====================================')

    const queryString = `
      AND
        FORN_COD = ${fornCod}
    `

    const listPayService = new ListPayService()

    const listPayServiceExec = await listPayService.execute(acessToken, queryString)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async listNum (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listPayService = new ListPayService()

    const { trpgCod } = request.params

    const queryString = `
      AND
        TRPG_COD = ${trpgCod}
    `

    const listPayServiceExec = await listPayService.execute(acessToken, queryString)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async listNumDoc (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listPayService = new ListPayService()

    const { trpgNumDoc } = request.params

    const queryString = `
      AND
        TRPG_NUM_DOC = '${trpgNumDoc}'
    `

    const listPayServiceExec = await listPayService.execute(acessToken, queryString)
    return response.status(listPayServiceExec.status).json(listPayServiceExec.message)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const approvalPayService = new ApprovalPayService()

    const { password, arrayPay } = request.body

    let status = 200
    const message = []

    for await (const item of arrayPay) {
      const approvalPayServiceExec = await approvalPayService.execute(acessToken, item.trppCod, item.cereCod, item.valor, password)
      message.push(approvalPayServiceExec.message)
      if (approvalPayServiceExec.error === true) {
        status = 400
      }
    }

    return response.status(status).json(message)
  }
}
