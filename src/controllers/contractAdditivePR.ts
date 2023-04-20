import { Request, Response } from 'express';
import { ListServiceContractAdditiveTerm } from '../services/contractAdditiveTerm/listService';
import { ApprovalContractAdditiveTerm } from '../services/contractAdditiveTerm/approvalService';
import { ListServiceCodContractAdditiveTerm } from '../services/contractAdditiveTerm/listCodService';

interface IAdcsArray {
    status: number;
    message: string;
    erro: boolean;
}

export class ContractAdditiveTerm {
  public async list (request: Request, response: Response): Promise<Response> {
    const userId = request.user.USUA_COD;

    const listServiceContractAdditive = new ListServiceContractAdditiveTerm();

    const listServiceContractAdditiveExecute = await listServiceContractAdditive.execute(userId);

    return response.json(listServiceContractAdditiveExecute);
  }

  public async listCod (request: Request, response: Response): Promise<Response> {
    const userId = request.user.USUA_COD;

    const { cod } = request.params;

    const listServiceCodContractAdditiveTerm = new ListServiceCodContractAdditiveTerm();

    const listServiceCodContractAdditiveTermExec = await listServiceCodContractAdditiveTerm.execute(userId, cod);

    return response.json(listServiceCodContractAdditiveTermExec);
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const userId = request.user.USUA_COD;
    const { password, arrayAdcs } = request.body;

    const approvalServiceContract = new ApprovalContractAdditiveTerm();

    let msgAdcs = '';

    arrayAdcs.forEach(async (item: IAdcsArray[]) => {
      msgAdcs = `${msgAdcs} ${item[0]}`;
      await approvalServiceContract.execute(
        userId, item[1] + '', item[0] + '', password
      );
    });

    return response.status(200).json({
      message: 'Aditivo de contrato' + msgAdcs + ' aprovado'
    });
  }
}
