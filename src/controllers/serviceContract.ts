import { Request, Response } from 'express'
import { ListServiceContractServices } from '../services/serviceContract/listServiceContractServices'
import { ApprovalServiceContract } from '../services/serviceContract/approvalServiceContract'
import { ListDetailsServiceContract } from '../services/serviceContract/listDetailsService'

export class ServiceContract {
  public async list (request: Request, response: Response): Promise<Response> {
    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(request.user_cod, '', request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listCode (request: Request, response: Response): Promise<Response> {
    const { cod } = request.params

    const queryString = `
    AND
      COCS_COD = ${cod}
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(request.user_cod, queryString, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listEmpr (request: Request, response: Response): Promise<Response> {
    const { empr } = request.params

    const queryString = `
    AND
      EMPR_NOME LIKE '%${empr}%'
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(request.user_cod, queryString, request.database)
    return response.status(execute.status).json(execute.message)
  }

  public async listFili (request: Request, response: Response): Promise<Response> {
    const { fili } = request.params

    const queryString = `
    AND
      FILI_NOME_FANTASIA LIKE '%${fili}%'
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(request.user_cod, queryString, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listForn (request: Request, response: Response): Promise<Response> {
    const { forn } = request.params

    const queryString = `
    AND
      FORN_NOME LIKE '%${forn}%'
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(request.user_cod, queryString, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listCereCod (request: Request, response: Response): Promise<Response> {
    const { cereCod } = request.params

    const queryString = `
    AND
    COCS_FORN_COD = ${cereCod}
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(request.user_cod, queryString, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listLocal (request: Request, response: Response): Promise<Response> {
    const { local } = request.params

    const queryString = `
    AND
      LOCA_COD = ${local}
    `

    const listServiceContractServices = new ListServiceContractServices()
    console.log('====================================')
    console.log(queryString)
    console.log('====================================')
    const execute = await listServiceContractServices.execute(request.user_cod, queryString, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async listDetails (request: Request, response: Response): Promise<Response> {
    const { cod } = request.params

    const listDetailsServiceContract = new ListDetailsServiceContract()

    const execute = await listDetailsServiceContract.execute(cod, request.database)

    return response.status(execute.status).json(execute.message)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const { password, arrayCocs } = request.body

    const approvalServiceContract = new ApprovalServiceContract()

    const msgCocs:string[] = []
    let status = 200

    for await (const item of arrayCocs) {
      console.log('====================================')
      console.log(item)
      console.log('====================================')
      const execute = await approvalServiceContract.execute(
        request.user_sigla, item.posAss + '', item.cod + '', password, item.valor, request.database
      )
      if (execute.erro === true) {
        status = execute.status
      }
      msgCocs.push(execute.message)
    }

    return response.status(status).json(msgCocs)
  }
}
