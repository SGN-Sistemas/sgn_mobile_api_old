import { Request, Response } from 'express'
import { ListSectorService } from '../services/setorCompras/listService'

export class SectorControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')
    const listSectorService = new ListSectorService()
    const listSectorServiceExec = await listSectorService.execute(acessToken)
    return response.json(listSectorServiceExec)
  }
}
