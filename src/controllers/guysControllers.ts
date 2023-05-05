import { Request, Response } from 'express'
import { ListGuysService } from '../services/guys/listService'

export class GuysControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listGuysService = new ListGuysService()
    const listGuysServiceExec = await listGuysService.execute()
    return response.json(listGuysServiceExec)
  }
}
