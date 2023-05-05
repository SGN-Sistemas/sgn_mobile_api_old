import { Request, Response } from 'express'
import { ListMaterialService } from '../services/material/listService'

export class MaterialControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')
    const listMaterialService = new ListMaterialService()
    const listMaterialServiceExec = await listMaterialService.execute(acessToken)
    return response.json(listMaterialServiceExec)
  }
}
