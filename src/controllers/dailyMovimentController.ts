import { Request, Response } from 'express'
import { GetDailyMovimentServices } from '../services/dayleMoviment/GetDailyMovimentServices'
import { GetDailyMovimentComboAplicacaoServices } from '../services/dayleMoviment/GetDailyMovimentComboAplicacaoServices'
import { FilterAplicacao } from '../services/dayleMoviment/FilterAplicacaoService'
import { FilterDataAndAplMovimentService } from '../services/dayleMoviment/FilterDataAndAplMovimentService'
import { DetailsMoivmentService } from '../services/dayleMoviment/DetailsMoivmentService'

export default class DailyMovimentController {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'Token is missing' })
    }
    const [, acessToken] = authHeader.split(' ')

    const getDailyMovimentServices = await new GetDailyMovimentServices()

    const execute = await getDailyMovimentServices.execute(acessToken)

    return response.json(execute)
  }

  public async listCmb (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'Token is missing' })
    }
    const [, acessToken] = authHeader.split(' ')

    const getDailyMovimentComboAplicacaoServices = await new GetDailyMovimentComboAplicacaoServices()

    const execute = await getDailyMovimentComboAplicacaoServices.execute(acessToken)

    return response.json(execute)
  }

  public async FilterAplicacaoNome (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'Token is missing' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { aplicacao } = request.params

    if (!aplicacao) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const filterAplicacao = await new FilterAplicacao()

    const execute = await filterAplicacao.execute(acessToken, aplicacao)

    return response.json(execute)
  }

  public async FilterAplicacaoDataAndApl (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'Token is missing' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { aplicacao, dataIni, dataFim } = request.body

    if (!dataIni || !dataFim) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const filterDataAndAplMovimentService = new FilterDataAndAplMovimentService()

    const execute = await filterDataAndAplMovimentService.execute(acessToken, dataIni, dataFim, aplicacao)

    return response.json(execute)
  }

  public async DetailsAplicacaoDataAndApl (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'Token missing' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { aplicacao, date } = request.query

    if (!date) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const detailsMoivmentService = new DetailsMoivmentService()

    if (!aplicacao) {
      const execute = await detailsMoivmentService.execute(acessToken, date.toString(), '')

      return response.json(execute)
    }

    const execute = await detailsMoivmentService.execute(acessToken, date.toString(), aplicacao.toString())

    return response.json(execute)
  }
}
