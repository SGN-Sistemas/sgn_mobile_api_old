import { Request, Response } from 'express';
import AprovaPlanilhaCompraService from '../../services/planilhaCompra/AprovaPlanilhaCompraService';

export default class AprovaPlanilhaCompraController {
  async handle (request: Request, response: Response) {
    const { planilhaId } = request.params;
    const userId = request.user.USUA_COD;

    const aprovaPlanilhaCompraService = new AprovaPlanilhaCompraService();

    const aprovaPlanilhaCompra = await aprovaPlanilhaCompraService.execute({
      userId,
      planilhaId
    });

    return response.status(200).json(aprovaPlanilhaCompra);
  }
}
