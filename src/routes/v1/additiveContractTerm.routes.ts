import { Router } from 'express';
import { ContractAdditiveTerm } from '../../controllers/contractAdditivePR';

export const routerContractAdditiveTerm = Router();

const contractAdditiveTerm = new ContractAdditiveTerm();

routerContractAdditiveTerm.get('/', contractAdditiveTerm.list);
routerContractAdditiveTerm.get('/:cod', contractAdditiveTerm.listCod);
routerContractAdditiveTerm.patch('/', contractAdditiveTerm.approval);
