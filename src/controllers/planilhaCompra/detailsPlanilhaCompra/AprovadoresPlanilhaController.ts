import { Request, Response } from 'express';
import AprovadoresPlanilhaService from '../../../services/planilhaCompra/detailsPlanilhaCompra/AprovadoresPlanilhaService';

export default class AprovadoresPlanilhaController {
  async handle (request: Request, response: Response) {
    const { planilhaId } = request.params;

    const aprovaPlanilhaCompraService = new AprovadoresPlanilhaService();

    const aprovaPlanilhaCompra = await aprovaPlanilhaCompraService.execute(
      planilhaId
    );

    return response.status(200).json(aprovaPlanilhaCompra);
  }
}
