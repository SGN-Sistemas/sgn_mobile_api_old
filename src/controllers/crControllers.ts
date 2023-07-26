import { Request, Response } from 'express'
import { ListCrService } from '../services/cr/listService'

export class CrControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const { almoCod } = request.params
    const listCrService = new ListCrService()
    const listCrServiceExec = await listCrService.execute(request.user_cod, almoCod, request.database)
    return response.status(listCrServiceExec.status).json(listCrServiceExec.message)
  }
}
