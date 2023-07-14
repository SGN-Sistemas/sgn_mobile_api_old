import { Request, Response } from 'express'
import { ListItemPgcService } from '../services/itemPcg/listService'

export class ItemPgcControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const { plgcCod, trcrCod, cereCod } = request.params

    const listItemPgcService = new ListItemPgcService()

    const listItemPgcServiceExec = await listItemPgcService.execute(request.user_cod, plgcCod, trcrCod, cereCod, request.database)

    return response.status(listItemPgcServiceExec.status).json(listItemPgcServiceExec.message)
  }
}
