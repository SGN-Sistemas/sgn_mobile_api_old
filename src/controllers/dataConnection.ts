import { Request, Response } from 'express'
import { ListDataConnectionService } from '../services/dataConnection/listService'

export class DataConnectionControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listDataConnectionService = new ListDataConnectionService()
    const { cnpj } = request.params
    const execute = await listDataConnectionService.execute(cnpj)

    return response.status(execute.status).json(execute)
  }
}
