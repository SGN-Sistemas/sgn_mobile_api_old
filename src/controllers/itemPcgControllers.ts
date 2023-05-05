import { Request, Response } from 'express'
import { ListItemPgcService } from '../services/itemPcg/listService'

export class ItemPgcControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const { plgcCod, trcrCod, cereCod } = request.params

    const listItemPgcService = new ListItemPgcService()

    const listItemPgcServiceExec = await listItemPgcService.execute(acessToken, plgcCod, trcrCod, cereCod)

    return response.json(listItemPgcServiceExec)
  }
}
