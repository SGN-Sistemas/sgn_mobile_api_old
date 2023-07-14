import { Request, Response } from 'express'
import { ListCompanyUserService } from '../services/company/ListCompanyUserService'
export default class CompanyController {
  public async list (request: Request, response: Response): Promise<Response> {
    const listCompanyUserService = new ListCompanyUserService()

    const execute = await listCompanyUserService.execute(request.user_cod, request.database)

    return response.status(execute.status).json(execute.message)
  }
}
