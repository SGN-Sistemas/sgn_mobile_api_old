import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ServiceContractBulletinController } from '../../controllers/serviceContractBulletin'

export const routerBulletin = express.Router()

const bulletin = new ServiceContractBulletinController()

routerBulletin.get('/', isAuthenticatedAcess, bulletin.list)
routerBulletin.get('/:cod', isAuthenticatedAcess, bulletin.listDetails)
routerBulletin.patch('/', isAuthenticatedAcess, bulletin.approval)
