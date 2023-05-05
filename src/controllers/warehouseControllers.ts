import { Request, Response } from 'express'
import { ListWarehouseService } from '../services/warehouse/list'

export class WarehouseControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')
    const listWarehouseService = new ListWarehouseService()
    const listWarehouseServiceExec = await listWarehouseService.execute(acessToken)
    return response.json(listWarehouseServiceExec)
  }
}
