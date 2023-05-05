import { Request, Response } from 'express'
import { ListServiceContractAdditive } from '../services/contractAdditive/listService'
import { ApprovalContractAdditive } from '../services/contractAdditive/approvalService'
import { ListCodServiceContractAdditive } from '../services/contractAdditive/listCodService'

interface IAdcsArray {
    status: number;
    message: string;
    erro: boolean;
}

export class ContractAdditive {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listServiceContractAdditive = new ListServiceContractAdditive()

    const listServiceContractAdditiveExecute = await listServiceContractAdditive.execute(acessToken)

    return response.json(listServiceContractAdditiveExecute)
  }

  public async listCod (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { cod } = request.params

    const listCodServiceContractAdditive = new ListCodServiceContractAdditive()

    const listCodServiceContractAdditiveExec = await listCodServiceContractAdditive.execute(acessToken, cod + '')

    return response.json(listCodServiceContractAdditiveExec)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { password, arrayAdcs } = request.body

    const approvalServiceContract = new ApprovalContractAdditive()

    let msgAdcs = ''

    arrayAdcs.forEach(async (item: IAdcsArray[]) => {
      msgAdcs = `${msgAdcs} ${item[1]}`
      await approvalServiceContract.execute(
        acessToken, item[1] + '', item[0] + '', password
      )
    })

    return response.status(200).json({
      message: 'Aditivo de contrato' + msgAdcs + ' aprovado'
    })
  }
}
