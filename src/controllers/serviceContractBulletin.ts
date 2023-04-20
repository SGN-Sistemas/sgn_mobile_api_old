import { Request, Response } from 'express';
import { ServiceContractBulletinService } from '../services/serviceContractBulletin/listServiceContractBulletin';
import { ListDetailsBulletin } from '../services/serviceContractBulletin/listDetailsService';
import { ApprovalBulletinService } from '../services/serviceContractBulletin/approvalService';

interface IBocsArray {
  cod: string;
  pos: string;
}

export class ServiceContractBulletinController {
  public async list (request: Request, response: Response): Promise<Response> {

    const userId = request.user.USUA_COD;

    const serviceContractBulletinService = new ServiceContractBulletinService();

    const result = await serviceContractBulletinService.execute(userId);

    return response.json(result);
  }

  public async listDetails(request: Request, response: Response): Promise<Response> {

    const listDetailsBulletin = new ListDetailsBulletin();

    const { cod } = request.params;

    const result = await listDetailsBulletin.execute(cod);

    return response.json(result);
  }

  public async approval(request: Request, response: Response): Promise<Response> {
    const userId = request.user.USUA_COD;

    const approvalBulletinService = new ApprovalBulletinService();

    const { password, arrayBoletimC } = request.body;

    let msgCocs = '';

    arrayBoletimC.forEach(async (item: IBocsArray[]) => {
      msgCocs = `${msgCocs} ${item[0]}`;
      await approvalBulletinService.execute(
        userId,
        item[0] + '',
        item[1] + '',
        password
      );
    });

    return response.json(msgCocs);
  }
}
