import { Request, Response } from 'express'
import { ListPurcahseWorksheet } from '../services/purchaseWorksheet/list'

export class PurchaseWorksheetControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listPurcahseWorksheet = new ListPurcahseWorksheet()

    const listPurcahseWorksheetExec = await listPurcahseWorksheet.execute(request.user_cod, request.database)

    return response.status(listPurcahseWorksheetExec.status).json(listPurcahseWorksheetExec)
  }
}
