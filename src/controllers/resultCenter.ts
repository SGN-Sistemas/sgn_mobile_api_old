import { Request, Response } from 'express'
import { ListResultCenterService } from '../services/resultCenter/listService'
import { DetailsResultCenterService } from '../services/resultCenter/detailsService'

export default class ResultCenterController {
  public async list (request: Request, response: Response): Promise<Response> {
    const listResultCenterService = new ListResultCenterService()

    const execute = await listResultCenterService.execute(request.user_cod, request.database)

    return response.status(execute.status).json(execute.message)
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
      dataFim,
      request.database
    )

    return response.status(execute.status).json(execute.message)
  }
}
