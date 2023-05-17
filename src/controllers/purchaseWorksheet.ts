import { Request, Response } from 'express'
import { ListPurcahseWorksheet } from '../services/purchaseWorksheet/list'

export class PurchaseWorksheetControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listPurcahseWorksheet = new ListPurcahseWorksheet()

    const listPurcahseWorksheetExec = await listPurcahseWorksheet.execute(acessToken)

    return response.status(listPurcahseWorksheetExec.status).json(listPurcahseWorksheetExec)
  }
}
