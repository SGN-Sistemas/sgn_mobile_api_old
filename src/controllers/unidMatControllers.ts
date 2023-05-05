import { Request, Response } from 'express'
import { ListUnidMatService } from '../services/unidMat/listService'

export class UnidMatControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')
    const listUnidMatService = new ListUnidMatService()
    const listUnidMatServiceExec = await listUnidMatService.execute(acessToken)
    return response.json(listUnidMatServiceExec)
  }
}
