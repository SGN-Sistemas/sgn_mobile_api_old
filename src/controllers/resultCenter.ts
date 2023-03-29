import { Request, Response } from 'express'
import { ListResultCenterService } from '../services/resultCenter/listService'
import { DetailsResultCenterService } from '../services/resultCenter/detailsService'

export default class ResultCenterController {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listResultCenterService = new ListResultCenterService()

    const execute = await listResultCenterService.execute(acessToken)

    return response.json(execute)
  }

  public async listDetails (request: Request, response: Response): Promise<Response> {
    const {
      cod,
      planoContas,
      dataIni,
      dataFim
    } = request.params

    const detailsResultCenterService = new DetailsResultCenterService()

    const execute = await detailsResultCenterService.execute(
      cod,
      planoContas,
      dataIni,
      dataFim
    )

    return response.json(execute)
  }
}
