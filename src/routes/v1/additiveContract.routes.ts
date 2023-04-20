import { Router } from 'express';
import { ContractAdditive } from '../../controllers/contractAdditive';

export const routerContractAdditive = Router();

const contractAdditive = new ContractAdditive();

routerContractAdditive.get('/', contractAdditive.list);
routerContractAdditive.patch('/', contractAdditive.approval);
routerContractAdditive.get('/:cod', contractAdditive.listCod);
