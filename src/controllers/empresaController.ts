import { Request, Response } from 'express';
import { ListCompanyUserService } from '../services/company/ListCompanyUserService';
export default class CompanyController {
  public async list(request: Request, response: Response): Promise<Response> {
    const userId = request.user.USUA_COD;

    const listCompanyUserService = new ListCompanyUserService();

    const execute = await listCompanyUserService.execute(userId);

    return response.json(execute);
  }
}
