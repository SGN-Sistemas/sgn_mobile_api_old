import { Request, Response } from 'express';
import PlanilhaFornecedoresService from '../../../services/planilhaCompra/detailsPlanilhaCompra/PlanilhaFornecedoresService';

export default class PlanilhaFornecedoresController {
  async handle(request: Request, response: Response) {
    const { planilhaId } = request.params;

    const fornecedoresPlanilhaCompraService = new PlanilhaFornecedoresService();

    const aprovaPlanilhaCompra =
      await fornecedoresPlanilhaCompraService.execute(planilhaId);

    return response.status(200).json(aprovaPlanilhaCompra);
  }
}
