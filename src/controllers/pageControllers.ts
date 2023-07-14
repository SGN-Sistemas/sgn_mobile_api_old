import { Request, Response } from 'express'
import { ListParametros } from '../services/parametrosGerais/addSoli'

export class PageControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listCrService = new ListParametros()
    const listCrServiceExec = await listCrService.execute(request.database)
    return response.status(listCrServiceExec.status).json(listCrServiceExec.message)
  }
}
