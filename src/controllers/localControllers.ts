import { Request, Response } from 'express'
import { ListLocalService } from '../services/local/listService'

export class LocalControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listLocalService = new ListLocalService()
    const listLocalServiceExec = await listLocalService.execute(request.database)
    return response.status(listLocalServiceExec.status).json(listLocalServiceExec.message)
  }
}
