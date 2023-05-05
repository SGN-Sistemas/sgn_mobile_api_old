import { Request, Response } from 'express'
import { ListCrService } from '../services/cr/listService'

export class CrControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')
    const { almoCod } = request.params
    const listCrService = new ListCrService()
    const listCrServiceExec = await listCrService.execute(acessToken, almoCod)
    return response.json(listCrServiceExec)
  }
}
