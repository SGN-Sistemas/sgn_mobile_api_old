
import { Router } from 'express';
import { ServiceContractBulletinController } from '../../controllers/serviceContractBulletin';

export const routerBulletin = Router();

const bulletin = new ServiceContractBulletinController();

routerBulletin.get('/',  bulletin.list);
routerBulletin.get('/:cod', bulletin.listDetails);
routerBulletin.patch('/', bulletin.approval);
