import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import ResultCenterController from '../../controllers/resultCenter'

export const routerResultCenter = express.Router()

const resultCenterController = new ResultCenterController()

routerResultCenter.get('/', isAuthenticatedAcess, resultCenterController.list)
routerResultCenter.get('/:cod/:planoContas/:dataIni/:dataFim', isAuthenticatedAcess, resultCenterController.listDetails)
