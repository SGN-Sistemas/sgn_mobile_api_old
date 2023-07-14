import { Request, Response } from 'express'
import { ListMaterialService } from '../services/material/listService'

export class MaterialControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listMaterialService = new ListMaterialService()
    const listMaterialServiceExec = await listMaterialService.execute(request.database)
    return response.json(listMaterialServiceExec).status(listMaterialServiceExec.status)
  }
}
