import { Request, Response } from 'express'
import { GetDailyMovimentServices } from '../services/dayleMoviment/GetDailyMovimentServices'
import { GetDailyMovimentComboAplicacaoServices } from '../services/dayleMoviment/GetDailyMovimentComboAplicacaoServices'
import { FilterAplicacao } from '../services/dayleMoviment/FilterAplicacaoService'
import { FilterDataAndAplMovimentService } from '../services/dayleMoviment/FilterDataAndAplMovimentService'
import { DetailsMoivmentService } from '../services/dayleMoviment/DetailsMoivmentService'

export default class DailyMovimentController {
  public async list (request: Request, response: Response): Promise<Response> {
    const getDailyMovimentServices = new GetDailyMovimentServices()

    const execute = await getDailyMovimentServices.execute(request.user_cod, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listCmb (request: Request, response: Response): Promise<Response> {
    const getDailyMovimentComboAplicacaoServices = new GetDailyMovimentComboAplicacaoServices()

    const execute = await getDailyMovimentComboAplicacaoServices.execute(request.user_cod, request.database)

    return response.status(execute.status).json(execute.messsage)
  }

  public async FilterAplicacaoNome (request: Request, response: Response): Promise<Response> {
    const { aplicacao } = request.params

    if (!aplicacao) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const filterAplicacao = new FilterAplicacao()

    const execute = await filterAplicacao.execute(request.user_cod, aplicacao, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async FilterAplicacaoDataAndApl (request: Request, response: Response): Promise<Response> {
    const { aplicacao, dataIni, dataFim } = request.body

    if (!dataIni || !dataFim) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const filterDataAndAplMovimentService = new FilterDataAndAplMovimentService()

    const execute = await filterDataAndAplMovimentService.execute(request.user_cod, dataIni, dataFim, aplicacao, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async DetailsAplicacaoDataAndApl (request: Request, response: Response): Promise<Response> {
    const { aplicacao, date } = request.query

    if (!date) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const detailsMoivmentService = new DetailsMoivmentService()

    if (!aplicacao) {
      const execute = await detailsMoivmentService.execute(request.user_cod, date.toString(), '', request.database)

      return response.status(execute.status).json(execute.message)
    }

    const execute = await detailsMoivmentService.execute(request.user_cod, date.toString(), aplicacao.toString(), request.database)

    return response.status(execute.status).json(execute.message)
  }
}
