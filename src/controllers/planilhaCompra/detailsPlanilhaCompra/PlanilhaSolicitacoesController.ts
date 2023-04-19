import { Request, Response } from 'express';
import PlanilhaSolicitacoesService from '../../../services/planilhaCompra/detailsPlanilhaCompra/PlanilhaSolicitacoesService';

export default class PlanilhaSolicitacoesController {
  async handle(request: Request, response: Response) {
    const { planilhaId } = request.body;

    const solicitacoesPlanilhaCompraService = new PlanilhaSolicitacoesService();

    const solicitacoesPlanilhaCompra = await solicitacoesPlanilhaCompraService.execute(
      planilhaId
    );

    return response.status(200).json(solicitacoesPlanilhaCompra);
  }
}
