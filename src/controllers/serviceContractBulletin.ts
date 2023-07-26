import { Request, Response } from 'express'
import { ServiceContractBulletinService } from '../services/serviceContractBulletin/listServiceContractBulletin'
import { ListDetailsBulletin } from '../services/serviceContractBulletin/listDetailsService'
import { ApprovalBulletinService } from '../services/serviceContractBulletin/approvalService'
import { ServiceContractBulletinServiceApprovaded } from '../services/serviceContractBulletin/listServiceBulletinApprovaded'

export class ServiceContractBulletinController {
  public async list (request: Request, response: Response): Promise<Response> {
    const serviceContractBulletinService = new ServiceContractBulletinService()

    const result = await serviceContractBulletinService.execute(request.user_cod, request.database, '')

    return response.status(result.status).json(result.message)
  }

  public async listCocs (request: Request, response: Response): Promise<Response> {
    const serviceContractBulletinService = new ServiceContractBulletinService()

    const { codCocs } = request.params

    const queryString = `
      AND
        BOCS_COCS_COD = ${codCocs}
    `

    const result = await serviceContractBulletinService.execute(request.user_cod, request.database, queryString)

    return response.status(result.status).json(result.message)
  }

  public async listNum (request: Request, response: Response): Promise<Response> {
    const serviceContractBulletinService = new ServiceContractBulletinService()

    const { numBocs } = request.params

    const queryString = `
      AND
        BOCS_NUMERO = ${numBocs}
    `

    const result = await serviceContractBulletinService.execute(request.user_cod, request.database, queryString)

    return response.status(result.status).json(result.message)
  }

  public async listFornCod (request: Request, response: Response): Promise<Response> {
    const serviceContractBulletinService = new ServiceContractBulletinService()

    const { fornCod } = request.params

    console.log('====================================')
    console.log(fornCod)
    console.log('====================================')

    const queryString = `
      AND
        COCS_FORN_COD = ${fornCod}
    `

    const result = await serviceContractBulletinService.execute(request.user_cod, request.database, queryString)

    return response.status(result.status).json(result.message)
  }

  public async listCereCod (request: Request, response: Response): Promise<Response> {
    const serviceContractBulletinService = new ServiceContractBulletinService()

    const { cereCod } = request.params

    console.log('====================================')
    console.log(cereCod)
    console.log('====================================')

    const queryString = `
      AND
        COCS_CERE_COD = ${cereCod}
    `

    const result = await serviceContractBulletinService.execute(request.user_cod, request.database, queryString)

    return response.status(result.status).json(result.message)
  }

  public async listAprrovaded (request: Request, response: Response): Promise<Response> {
    const serviceContractBulletinServiceApprovaded = new ServiceContractBulletinServiceApprovaded()

    const result = await serviceContractBulletinServiceApprovaded.execute(request.user_cod, request.database)

    return response.status(result.status).json(result.message)
  }

  public async listDetails (request: Request, response: Response): Promise<Response> {
    const listDetailsBulletin = new ListDetailsBulletin()

    const { cod } = request.params

    const result = await listDetailsBulletin.execute(cod, request.database)

    return response.status(result.status).json(result.message)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const approvalBulletinService = new ApprovalBulletinService()

    const { password, arrayBoletimC } = request.body

    const msgCocs: string[] = []
    let status = 200
    let error = false
    for await (const item of arrayBoletimC) {
      const execute = await approvalBulletinService.execute(
        request.user_cod,
        item.cod,
        item.posAss,
        password,
        item.cereCod,
        item.valor,
        item.fornCod,
        request.database,
        request.user_sigla
      )
      if (execute.erro === true) {
        status = 400
        error = true
      }
      msgCocs.push(execute.message)
    }

    return response.status(status).json({
      message: msgCocs,
      status,
      error
    })
  }
}
