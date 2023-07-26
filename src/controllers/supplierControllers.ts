import { Request, Response } from 'express'
import { ListSupplierService } from '../services/supplier/listService'

export class SupplierControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listSupplierService = new ListSupplierService()
    const listSupplierServiceExec = await listSupplierService.execute(request.database)
    return response.status(listSupplierServiceExec.status).json(listSupplierServiceExec.message)
  }
}
