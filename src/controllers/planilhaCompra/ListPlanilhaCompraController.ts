import { Request, Response } from 'express';
import ListPlanilhaCompraService from '../../services/planilhaCompra/ListPlanilhaCompraService';

export class ListPlanilhaCompraController {
  async handle (request: Request, response: Response) {
    const usua_cod = request.user.USUA_COD;

    const listPlanilhaCompraService = new ListPlanilhaCompraService();

    const aprovaPlanilhaCompra = await listPlanilhaCompraService.execute(usua_cod);

    return response.status(200).json(aprovaPlanilhaCompra);
  }
}
