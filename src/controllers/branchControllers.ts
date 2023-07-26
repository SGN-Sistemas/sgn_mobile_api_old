import { Request, Response } from 'express'
import { ListBranchService } from '../services/branch/listService'

export class BranchControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listBranchService = new ListBranchService()
    const listBranchServiceExec = await listBranchService.execute(request.database)
    return response.status(listBranchServiceExec.status).json(listBranchServiceExec.message)
  }
}
