import { Request, Response } from 'express'
import { ListServicesService } from '../services/service/listService'

export class ServicesControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')
    const listServicesService = new ListServicesService()
    const listServicesServiceExec = await listServicesService.execute(acessToken)
    return response.json(listServicesServiceExec)
  }
}
