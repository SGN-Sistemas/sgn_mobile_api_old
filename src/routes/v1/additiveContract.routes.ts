import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ContractAdditive } from '../../controllers/contractAdditive'

export const routerContractAdditive = express.Router()

const contractAdditive = new ContractAdditive()

routerContractAdditive.get('/', isAuthenticatedAcess, contractAdditive.list)
routerContractAdditive.patch('/', isAuthenticatedAcess, contractAdditive.approval)
routerContractAdditive.get('/:cod', isAuthenticatedAcess, contractAdditive.listCod)
