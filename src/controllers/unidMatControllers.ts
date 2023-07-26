import { Request, Response } from 'express'
import { ListUnidMatService } from '../services/unidMat/listService'

export class UnidMatControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listUnidMatService = new ListUnidMatService()
    const listUnidMatServiceExec = await listUnidMatService.execute(request.database)
    return response.json(listUnidMatServiceExec)
  }
}
