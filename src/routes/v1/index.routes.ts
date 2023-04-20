import express from 'express';
import { routerUser } from './user.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../../swagger/swagger.json';
import { routerDailyMoviment } from './dailyMoviment.routes';
import { routerRequest } from './request.routes';
import routerCompany from './company.routes';
import { routerPurchaseOrder } from './purchaseOrder.routes';
import { routerServiceContract } from './serviceContract.routes';
import { routerBulletin } from './bulletinService.routes';
import { routerSchedule } from './schedule.routes';
import { routerContractAdditive } from './additiveContract.routes';
import { routerContractAdditiveTerm } from './additiveContractTerm.routes';
import { routerResultCenter } from './resultCenter.routes';
import { routerDataConnection } from './dataConnection.routes';
import { routerUpdate } from './update.routes';
import { planilhaCompraRoute } from './planilhaCompra.routes';
import Authenticated from '../../middlewares/Authenticated';

export const routerV1 = express.Router();

routerV1.use('/dataConnection', routerDataConnection);

routerV1.use('/usuario', routerUser);

routerV1.use(Authenticated);

routerV1.use('/planilhaCompra', planilhaCompraRoute);

routerV1.use('/dailyMoviment', routerDailyMoviment);

routerV1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routerV1.use('/pedido', routerRequest);

routerV1.use('/empresa', routerCompany);

routerV1.use('/solicitacaoCompra', routerPurchaseOrder);

routerV1.use('/contratoServico', routerServiceContract);

routerV1.use('/boletimServico', routerBulletin);

routerV1.use('/agenda', routerSchedule);

routerV1.use('/contratoAditivo', routerContractAdditive);

routerV1.use('/contratoAditivoPR', routerContractAdditiveTerm);

routerV1.use('/atualizacao', routerUpdate);

routerV1.use('/cr', routerResultCenter);
