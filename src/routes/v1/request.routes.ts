import { Router } from 'express';
import RequestController from '../../controllers/requestController';

export const routerRequest = Router();

const request = new RequestController();

routerRequest.get('/', request.list);
routerRequest.get('/numero/:numero', request.listNumber);
routerRequest.get('/forn/:forn', request.listForn);
routerRequest.get('/func/:func', request.listFunc);
routerRequest.patch('/', request.approvalRequest);
routerRequest.patch('/largeScale', request.approvalLargeScale);
routerRequest.get('/detalhe/:pediCod', request.ListItems);
