import { Request, Response } from 'express'
import { ServiceContractBulletinService } from '../services/serviceContractBulletin/listServiceContractBulletin'
import { ListDetailsBulletin } from '../services/serviceContractBulletin/listDetailsService'
import { ApprovalBulletinService } from '../services/serviceContractBulletin/approvalService'
import { ServiceContractBulletinServiceApprovaded } from '../services/serviceContractBulletin/listServiceBulletinApprovaded'

export class ServiceContractBulletinController {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const serviceContractBulletinService = new ServiceContractBulletinService()

    const result = await serviceContractBulletinService.execute(acessToken)

    return response.json(result)
  }

  public async listAprrovaded (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const serviceContractBulletinServiceApprovaded = new ServiceContractBulletinServiceApprovaded()

    const result = await serviceContractBulletinServiceApprovaded.execute(acessToken)

    return response.json(result)
  }

  public async listDetails (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const listDetailsBulletin = new ListDetailsBulletin()

    const { cod } = request.params

    const result = await listDetailsBulletin.execute(cod)

    return response.json(result)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const approvalBulletinService = new ApprovalBulletinService()

    const { password, arrayBoletimC } = request.body
    console.log('====================================')
    console.log(password, arrayBoletimC)
    console.log('====================================')
    const msgCocs: string[] = []
    let status = 200
    let error = false
    for await (const item of arrayBoletimC) {
      const execute = await approvalBulletinService.execute(
        acessToken,
        item.cod,
        item.posAss,
        password,
        item.cereCod,
        item.valor,
        item.fornCod
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
