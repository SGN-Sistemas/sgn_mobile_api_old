import { Router } from 'express';
import ResultCenterController from '../../controllers/resultCenter';

export const routerResultCenter = Router();

const resultCenterController = new ResultCenterController();

routerResultCenter.get('/', resultCenterController.list);
routerResultCenter.get('/:cod/:planoContas/:dataIni/:dataFim', resultCenterController.listDetails);
