import { Request, Response } from 'express'
import { ListPedidoService } from '../services/request/ListPedidoService'
import { ApprovalRequestService } from '../services/request/approvalRequest'
import { GetDetailsRequestServices } from '../services/request/getDetailsRequestServices'
import { selectCerePeitPedi } from '../queries/request'
import { PedidoEstoqueRepository } from '../typeorm/repository/pedidoEstoqueRepositories'
import { validCereFornPedi } from '../services/request/validCereForn'

export default class DailyMovimentController {
  public async list (request: Request, response: Response): Promise<Response> {
    const listPedidoService = new ListPedidoService()

    const execute = await listPedidoService.execute(request.user_cod, '', request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listNumber (request: Request, response: Response): Promise<Response> {
    const { numero } = request.params

    const queryString = `
    AND
      PEDI_NUMERO = '${numero}'
    `

    const listPedidoNumberService = new ListPedidoService()

    const execute = await listPedidoNumberService.execute(request.user_cod, queryString, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listForn (request: Request, response: Response): Promise<Response> {
    const { forn } = request.params

    const queryString = `
    AND
      FORN_NOME LIKE '%${forn}%'
    `

    const listPedidoFornService = new ListPedidoService()

    const execute = await listPedidoFornService.execute(request.user_cod, queryString, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listFunc (request: Request, response: Response): Promise<Response> {
    const { func } = request.params
    const queryString = `
    AND
      PESS_NOME LIKE '%${func}%'
    `
    const listPedidoFuncService = new ListPedidoService()

    const execute = await listPedidoFuncService.execute(request.user_cod, queryString, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async approvalRequest (request: Request, response: Response): Promise<Response> {
    const { USUA_SENHA_APP, posUsuaCod, pediCod, fornCod, valTotal, pediNumero } = request.body

    const approvalRequestService = new ApprovalRequestService()

    const sql = selectCerePeitPedi(pediCod)

    const sqlExec = await PedidoEstoqueRepository.query(sql)

    for (let i = 0; i < sqlExec.length; i++) {
      const valid = await validCereFornPedi(request.user_cod, sqlExec[i].CERE_COD, valTotal, fornCod, pediCod, request.database)

      if (valid.error === true) {
        return response.status(valid.status).json(valid)
      }
    }

    const approvalRequestExec = await approvalRequestService.execute(request.user_sigla, USUA_SENHA_APP, posUsuaCod, pediCod, pediNumero, request.database)

    return response.status(approvalRequestExec.status).json(approvalRequestExec)
  }

  public async approvalLargeScale (request: Request, response: Response) {
    const { USUA_SENHA_APP, arrayPedido } = request.body

    const pedidosTxt: string[] = []

    let status = 200

    let error = false

    for await (const item of arrayPedido) {
      const sql = selectCerePeitPedi(item.pediCod)

      const sqlExec = await PedidoEstoqueRepository.query(sql)

      for (let i = 0; i < sqlExec.length; i++) {
        const valid = await validCereFornPedi(request.user_cod, sqlExec[i].CERE_COD, item.valTotal, item.fornCod, item.pediCod, request.database)

        if (valid.error === true) {
          pedidosTxt.push(valid.message)

          status = 400

          error = true

          break
        }

        if (i === sqlExec.length || valid.error === false) {
          const approvalRequestService = new ApprovalRequestService()

          const approvalRequestExec = await approvalRequestService.execute(request.user_cod, USUA_SENHA_APP, item.ASS, item.pediCod, item.pediNumero, request.database)

          pedidosTxt.push(approvalRequestExec.message)

          status = approvalRequestExec.status

          error = approvalRequestExec.error
        }
      }
    }

    return response.status(status).json({
      message: pedidosTxt,
      error,
      status
    })
  }

  public async listItems (request: Request, response: Response): Promise<Response> {
    const { pediCod } = request.params

    const getDetailsRequestServices = new GetDetailsRequestServices()

    const execute = await getDetailsRequestServices.execute(pediCod, request.database)

    return response.status(execute.status).json(execute.message)
  }
}
