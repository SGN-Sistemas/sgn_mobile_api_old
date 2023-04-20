import { Router } from 'express';
import { ServiceContract } from '../../controllers/serviceContract';

export const routerServiceContract = Router();

const serviceContract = new ServiceContract();

routerServiceContract.get('/', serviceContract.list);
routerServiceContract.get('/cod/:cod', serviceContract.listCode);
routerServiceContract.get('/detalhes/:cod', serviceContract.listDetails);
routerServiceContract.get('/empr/:empr', serviceContract.listEmpr);
routerServiceContract.get('/fili/:fili', serviceContract.listFili);
routerServiceContract.get('/forn/:forn', serviceContract.listForn);
routerServiceContract.get('/local/:local', serviceContract.listLocal);
routerServiceContract.patch('/', serviceContract.approval);
