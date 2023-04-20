import { Router } from 'express';
import DailyMovimentController from '../../controllers/dailyMovimentController';

export const routerDailyMoviment = Router();

const DailyMoviment = new DailyMovimentController();

routerDailyMoviment.get('/', DailyMoviment.list);
routerDailyMoviment.get('/cmbAplicacao', DailyMoviment.listCmb);
routerDailyMoviment.get('/filter/aplicacao/:aplicacao', DailyMoviment.FilterAplicacaoNome);
routerDailyMoviment.get('/filter/aplicacaoData', DailyMoviment.FilterAplicacaoDataAndApl);
routerDailyMoviment.get('/details/aplicacaoData', DailyMoviment.DetailsAplicacaoDataAndApl);
