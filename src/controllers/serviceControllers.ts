import { Request, Response } from 'express'
import { ListServicesService } from '../services/service/listService'

export class ServicesControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listServicesService = new ListServicesService()
    const listServicesServiceExec = await listServicesService.execute(request.database)
    return response.status(listServicesServiceExec.status).json(listServicesServiceExec.message)
  }
}
