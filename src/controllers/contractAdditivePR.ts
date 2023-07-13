import { Request, Response } from 'express'
import { ListServiceContractAdditiveTerm } from '../services/contractAdditiveTerm/listService'
import { ApprovalContractAdditiveTerm } from '../services/contractAdditiveTerm/approvalService'
import { ListServiceCodContractAdditiveTerm } from '../services/contractAdditiveTerm/listCodService'

interface IAdcsArray {
    status: number;
    message: string;
    erro: boolean;
}

export class ContractAdditiveTerm {
  public async list (request: Request, response: Response): Promise<Response> {
    const listServiceContractAdditive = new ListServiceContractAdditiveTerm()

    const listServiceContractAdditiveExecute = await listServiceContractAdditive.execute(request.user_cod, request.database)

    return response.json(listServiceContractAdditiveExecute)
  }

  public async listCod (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { cod } = request.params

    const listServiceCodContractAdditiveTerm = new ListServiceCodContractAdditiveTerm()

    const listServiceCodContractAdditiveTermExec = await listServiceCodContractAdditiveTerm.execute(acessToken, cod)

    return response.json(listServiceCodContractAdditiveTermExec)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { password, arrayAdcs } = request.body

    const approvalServiceContract = new ApprovalContractAdditiveTerm()

    let msgAdcs = ''

    arrayAdcs.forEach(async (item: IAdcsArray[]) => {
      msgAdcs = `${msgAdcs} ${item[0]}`
      await approvalServiceContract.execute(
        acessToken, item[1] + '', item[0] + '', password
      )
    })

    return response.status(200).json({
      message: 'Aditivo de contrato' + msgAdcs + ' aprovado'
    })
  }
}
