import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ServiceContractBulletinController } from '../../controllers/serviceContractBulletin'

export const routerBulletin = express.Router()

const bulletin = new ServiceContractBulletinController()

routerBulletin.get('/', isAuthenticatedAcess, bulletin.list)
routerBulletin.get('/contrato/:codCocs', isAuthenticatedAcess, bulletin.listCocs)
routerBulletin.get('/numero/:numBocs', isAuthenticatedAcess, bulletin.listNum)
routerBulletin.get('/fornecedor/:fornCod', isAuthenticatedAcess, bulletin.listFornCod)
routerBulletin.get('/cr/:cereCod', isAuthenticatedAcess, bulletin.listCereCod)
routerBulletin.get('/:cod', isAuthenticatedAcess, bulletin.listDetails)
routerBulletin.patch('/', isAuthenticatedAcess, bulletin.approval)
routerBulletin.get('/controle/approveded', isAuthenticatedAcess, bulletin.listAprrovaded)
