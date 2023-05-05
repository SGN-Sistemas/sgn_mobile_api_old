import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ContractAdditiveTerm } from '../../controllers/contractAdditivePR'

export const routerContractAdditiveTerm = express.Router()

const contractAdditiveTerm = new ContractAdditiveTerm()

routerContractAdditiveTerm.get('/', isAuthenticatedAcess, contractAdditiveTerm.list)
routerContractAdditiveTerm.get('/:cod', isAuthenticatedAcess, contractAdditiveTerm.listCod)
routerContractAdditiveTerm.patch('/', isAuthenticatedAcess, contractAdditiveTerm.approval)
