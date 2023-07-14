import { Request, Response } from 'express'
import { ListServiceContractAdditiveTerm } from '../services/contractAdditiveTerm/listService'
import { ApprovalContractAdditiveTerm } from '../services/contractAdditiveTerm/approvalService'
import { ListServiceCodContractAdditiveTerm } from '../services/contractAdditiveTerm/listCodService'

export class ContractAdditiveTerm {
  public async list (request: Request, response: Response): Promise<Response> {
    const listServiceContractAdditive = new ListServiceContractAdditiveTerm()

    const listServiceContractAdditiveExecute = await listServiceContractAdditive.execute(request.user_cod, request.database)

    return response.status(listServiceContractAdditiveExecute.status).json(listServiceContractAdditiveExecute.message)
  }

  public async listCod (request: Request, response: Response): Promise<Response> {
    const { cod } = request.params

    const listServiceCodContractAdditiveTerm = new ListServiceCodContractAdditiveTerm()

    const listServiceCodContractAdditiveTermExec = await listServiceCodContractAdditiveTerm.execute(request.user_cod, cod, request.database)

    return response.status(listServiceCodContractAdditiveTermExec.status).json(listServiceCodContractAdditiveTermExec.message)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const { password, arrayAdcs } = request.body

    const approvalServiceContract = new ApprovalContractAdditiveTerm()

    let execute: {
      status: number;
      message: string;
      error: boolean;
    } = {
      status: 500,
      message: 'Internal Server Error',
      error: true
    }

    const arrayMsg: string[] = ['']

    for await (const item of arrayAdcs) {
      execute = await approvalServiceContract.execute(
        request.user_cod, item[1] + '', item[0] + '', password, request.database
      )
      arrayMsg.push(execute.message)
    }
    return response.status(execute.status).json({
      message: arrayMsg
    })
  }
}
