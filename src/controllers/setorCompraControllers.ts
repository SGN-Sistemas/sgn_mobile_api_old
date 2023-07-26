import { Request, Response } from 'express'
import { ListSectorService } from '../services/setorCompras/listService'

export class SectorControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listSectorService = new ListSectorService()
    const listSectorServiceExec = await listSectorService.execute(request.user_cod, request.database)
    return response.json(listSectorServiceExec)
  }
}
