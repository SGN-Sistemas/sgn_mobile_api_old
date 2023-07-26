import { Request, Response } from 'express'
import { ListPurcahseWorksheet } from '../services/purchaseWorksheet/list'
import { ListFornPurcahseWorksheet } from '../services/purchaseWorksheet/listForn'
import { ApprovalPlac } from '../services/purchaseWorksheet/approvalPlac'

export class PurchaseWorksheetControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const listPurcahseWorksheet = new ListPurcahseWorksheet()

    const listPurcahseWorksheetExec = await listPurcahseWorksheet.execute(request.user_cod, request.database, '')

    return response.status(listPurcahseWorksheetExec.status).json(listPurcahseWorksheetExec.message)
  }

  public async listCod (request: Request, response: Response): Promise<Response> {
    const listPurcahseWorksheet = new ListPurcahseWorksheet()

    const {
      placCod
    } = request.params

    const queryString = `
      AND 
        PLAC_COD = ${placCod}
    `

    const listPurcahseWorksheetExec = await listPurcahseWorksheet.execute(request.user_cod, request.database, queryString)

    return response.status(listPurcahseWorksheetExec.status).json(listPurcahseWorksheetExec.message)
  }

  public async listSeco (request: Request, response: Response): Promise<Response> {
    const listPurcahseWorksheet = new ListPurcahseWorksheet()

    const {
      secoCod
    } = request.params

    const queryString = `
      AND 
        PLAC_SECO_COD = ${secoCod}
    `

    const listPurcahseWorksheetExec = await listPurcahseWorksheet.execute(request.user_cod, request.database, queryString)

    return response.status(listPurcahseWorksheetExec.status).json(listPurcahseWorksheetExec.message)
  }

  public async listPess (request: Request, response: Response): Promise<Response> {
    const listPurcahseWorksheet = new ListPurcahseWorksheet()

    const {
      pessCod
    } = request.params

    const queryString = `
      AND 
        PLAC_PESS_COD = ${pessCod}
    `

    const listPurcahseWorksheetExec = await listPurcahseWorksheet.execute(request.user_cod, request.database, queryString)

    return response.status(listPurcahseWorksheetExec.status).json(listPurcahseWorksheetExec.message)
  }

  public async listForn (request: Request, response: Response): Promise<Response> {
    const listPurcahseWorksheet = new ListFornPurcahseWorksheet()

    const {
      placCod
    } = request.params

    const listPurcahseWorksheetExec = await listPurcahseWorksheet.execute(placCod, request.database)

    return response.status(listPurcahseWorksheetExec.status).json(listPurcahseWorksheetExec.message)
  }

  public async listSoli (request: Request, response: Response): Promise<Response> {
    const listPurcahseWorksheet = new ListFornPurcahseWorksheet()

    const {
      placCod
    } = request.params

    const listPurcahseWorksheetExec = await listPurcahseWorksheet.execute(placCod, request.database)

    return response.status(listPurcahseWorksheetExec.status).json(listPurcahseWorksheetExec.message)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const { password, pos, placCod } = request.body

    const approvalPlac = new ApprovalPlac()

    const execute = await approvalPlac.execute(
      request.user_sigla,
      placCod,
      password,
      pos,
      request.database
    )

    return response.status(execute.status).json(execute.message)
  }
}
