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
    const listServiceContractAdditive = new ListServiceContractAdditive()
    const listServiceContractAdditiveExecute = await listServiceContractAdditive.execute(request.user_cod, request.database)

    return response.status(listServiceContractAdditiveExecute.status).json(listServiceContractAdditiveExecute.message)
  }

  public async listCod (request: Request, response: Response): Promise<Response> {
    const { cod } = request.params

    const listCodServiceContractAdditive = new ListCodServiceContractAdditive()

    const listCodServiceContractAdditiveExec = await listCodServiceContractAdditive.execute(request.user_cod, cod, request.database)

    return response.status(listCodServiceContractAdditiveExec.status).json(listCodServiceContractAdditiveExec.message)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const { password, arrayAdcs } = request.body

    const approvalServiceContract = new ApprovalContractAdditive()

    let msgAdcs = ''

    arrayAdcs.forEach(async (item: IAdcsArray[]) => {
      msgAdcs = `${msgAdcs} ${item[1]}`
      await approvalServiceContract.execute(
        request.user_cod, item[1] + '', item[0] + '', password, request.database
      )
    })

    return response.status(200).json({
      message: 'Aditivo de contrato' + msgAdcs + ' aprovado'
    })
  }
}
