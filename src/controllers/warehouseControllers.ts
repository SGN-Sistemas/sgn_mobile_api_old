import { Request, Response } from 'express'
import { ListWarehouseService } from '../services/warehouse/list'

export class WarehouseControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listWarehouseService = new ListWarehouseService()
    const listWarehouseServiceExec = await listWarehouseService.execute(request.user_cod, request.database)
    return response.status(listWarehouseServiceExec.status).json(listWarehouseServiceExec.message)
  }
}
