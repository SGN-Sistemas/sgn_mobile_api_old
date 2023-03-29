import express from 'express'
import DailyMovimentController from '../../controllers/dailyMovimentController'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'

export const routerDailyMoviment = express.Router()

const DailyMoviment = new DailyMovimentController()

routerDailyMoviment.get('/', isAuthenticatedAcess, DailyMoviment.list)
routerDailyMoviment.get('/cmbAplicacao', isAuthenticatedAcess, DailyMoviment.listCmb)
routerDailyMoviment.get('/filter/aplicacao/:aplicacao', isAuthenticatedAcess, DailyMoviment.FilterAplicacaoNome)
routerDailyMoviment.get('/filter/aplicacaoData', isAuthenticatedAcess, DailyMoviment.FilterAplicacaoDataAndApl)
routerDailyMoviment.get('/details/aplicacaoData', isAuthenticatedAcess, DailyMoviment.DetailsAplicacaoDataAndApl)
