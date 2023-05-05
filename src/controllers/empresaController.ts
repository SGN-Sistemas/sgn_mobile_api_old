import { Request, Response } from 'express'
import { ListCompanyUserService } from '../services/company/ListCompanyUserService'
export default class CompanyController {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listCompanyUserService = new ListCompanyUserService()

    const execute = await listCompanyUserService.execute(acessToken)

    return response.json(execute)
  }
}
