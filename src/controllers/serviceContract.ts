import { Request, Response } from 'express'
import { ListServiceContractServices } from '../services/serviceContract/listServiceContractServices'
import { ApprovalServiceContract } from '../services/serviceContract/approvalServiceContract'
import { ListDetailsServiceContract } from '../services/serviceContract/listDetailsService'

export class ServiceContract {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(acessToken, '')

    return response.json(execute)
  }

  public async listCode (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { cod } = request.params

    const queryString = `
    AND
      COCS_COD = ${cod}
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(acessToken, queryString)

    return response.json(execute)
  }

  public async listEmpr (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { empr } = request.params

    const queryString = `
    AND
      EMPR_NOME LIKE '%${empr}%'
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(acessToken, queryString)

    return response.json(execute)
  }

  public async listFili (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { fili } = request.params

    const queryString = `
    AND
      FILI_NOME_FANTASIA LIKE '%${fili}%'
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(acessToken, queryString)

    return response.json(execute)
  }

  public async listForn (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { forn } = request.params

    const queryString = `
    AND
      FORN_NOME LIKE '%${forn}%'
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(acessToken, queryString)

    return response.json(execute)
  }

  public async listLocal (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { local } = request.params

    const queryString = `
    AND
      LOCA_DESC LIKE '%${local}%'
    `

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(acessToken, queryString)

    return response.json(execute)
  }

  public async listDetails (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const { cod } = request.params

    const listDetailsServiceContract = new ListDetailsServiceContract()

    const execute = await listDetailsServiceContract.execute(cod)

    return response.json(execute)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { password, arrayCocs } = request.body

    const approvalServiceContract = new ApprovalServiceContract()

    const msgCocs:string[] = []
    let status = 200
    let erro = false

    for await (const item of arrayCocs) {
      const execute = await approvalServiceContract.execute(
        acessToken, item[0] + '', item[1] + '', password, item[2]
        // TOKEN: string, ass: string, codCocs: string, password: string, valTotal: string
      )
      if (execute.erro === true) {
        status = 400
        erro = true
      }
      msgCocs.push(execute.message)
    }

    return response.status(status).json({
      message: msgCocs,
      erro,
      status
    })
  }
}
