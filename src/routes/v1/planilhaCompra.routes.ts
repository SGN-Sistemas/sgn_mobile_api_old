import { Router } from 'express';
import AprovaPlanilhaCompraController from '../../controllers/planilhaCompra/AprovaPlanilhaCompraController';
import { ListPlanilhaCompraController } from '../../controllers/planilhaCompra/ListPlanilhaCompraController';
import AprovadoresPlanilhaController from '../../controllers/planilhaCompra/detailsPlanilhaCompra/AprovadoresPlanilhaController';
import PlanilhaSolicitacoesController from '../../controllers/planilhaCompra/detailsPlanilhaCompra/PlanilhaSolicitacoesController';
import PlanilhaFornecedoresController from '../../controllers/planilhaCompra/detailsPlanilhaCompra/PlanilhaFornecedoresController';
import PlanilhaDataController from '../../controllers/planilhaCompra/detailsPlanilhaCompra/PlanilhaDataController';

export const planilhaCompraRoute = Router();

planilhaCompraRoute.get(
  '/',
  new ListPlanilhaCompraController().handle
);

planilhaCompraRoute.patch(
  '/',
  new AprovaPlanilhaCompraController().handle
);

planilhaCompraRoute.get(
  '/aprovadores/:planilhaId',
  new AprovadoresPlanilhaController().handle
);

planilhaCompraRoute.get(
  '/solicitacoes/:planilhaId',
  new PlanilhaSolicitacoesController().handle
);

planilhaCompraRoute.get(
  '/fornecedores/:planilhaId',
  new PlanilhaFornecedoresController().handle
);

planilhaCompraRoute.get(
  '/data/:planilhaId',
  new PlanilhaDataController().handle
);
