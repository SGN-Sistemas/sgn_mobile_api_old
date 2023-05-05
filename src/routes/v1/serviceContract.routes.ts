import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ServiceContract } from '../../controllers/serviceContract'

export const routerServiceContract = express.Router()

const serviceContract = new ServiceContract()

routerServiceContract.get('/', isAuthenticatedAcess, serviceContract.list)
routerServiceContract.get('/cod/:cod', isAuthenticatedAcess, serviceContract.listCode)
routerServiceContract.get('/detalhes/:cod', isAuthenticatedAcess, serviceContract.listDetails)
routerServiceContract.get('/empr/:empr', isAuthenticatedAcess, serviceContract.listEmpr)
routerServiceContract.get('/fili/:fili', isAuthenticatedAcess, serviceContract.listFili)
routerServiceContract.get('/forn/:forn', isAuthenticatedAcess, serviceContract.listForn)
routerServiceContract.get('/local/:local', isAuthenticatedAcess, serviceContract.listLocal)
routerServiceContract.patch('/', isAuthenticatedAcess, serviceContract.approval)
