import { Request, Response } from 'express'
import { ListGuysService } from '../services/guys/listService'

export class GuysControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listGuysService = new ListGuysService()
    const execute = await listGuysService.execute(request.database)
    return response.status(execute.status).json(execute.message)
  }
}
