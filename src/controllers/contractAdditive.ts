import { Request, Response } from 'express';
import { ListServiceContractAdditive } from '../services/contractAdditive/listService';
import { ApprovalContractAdditive } from '../services/contractAdditive/approvalService';
import { ListCodServiceContractAdditive } from '../services/contractAdditive/listCodService';

interface IAdcsArray {
    status: number;
    message: string;
    erro: boolean;
}

export class ContractAdditive {
  public async list(request: Request, response: Response): Promise<Response> {

    const userId = request.user.USUA_COD;

    const listServiceContractAdditive = new ListServiceContractAdditive();

    const listServiceContractAdditiveExecute =
      await listServiceContractAdditive.execute(userId);

    return response.json(listServiceContractAdditiveExecute);
  }

  public async listCod (request: Request, response: Response): Promise<Response> {
    const userId = request.user.USUA_COD;

    const { cod } = request.params;

    const listCodServiceContractAdditive = new ListCodServiceContractAdditive();

    const listCodServiceContractAdditiveExec = await listCodServiceContractAdditive.execute(userId, cod + '');

    return response.json(listCodServiceContractAdditiveExec);
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const userId = request.user.USUA_COD;

    const { password, arrayAdcs } = request.body;

    const approvalServiceContract = new ApprovalContractAdditive();

    let msgAdcs = '';

    arrayAdcs.forEach(async (item: IAdcsArray[]) => {
      msgAdcs = `${msgAdcs} ${item[1]}`;
      await approvalServiceContract.execute(
        userId, item[1] + '', item[0] + '', password
      );
    });

    return response.status(200).json({
      message: 'Aditivo de contrato' + msgAdcs + ' aprovado'
    });
  }
}
