import { Request, Response } from 'express';
import PlanilhaDataService from '../../../services/planilhaCompra/detailsPlanilhaCompra/PlanilhaDataService';

export default class PlanilhaDataController {
  async handle(request: Request, response: Response) {
    const { planilhaId } = request.params;

    const planilhaDataService = new PlanilhaDataService();

    const aprovaPlanilhaCompra = await planilhaDataService.execute(
      planilhaId
    );

    return response.status(200).json(aprovaPlanilhaCompra);
  }
}
