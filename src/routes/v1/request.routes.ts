import express from 'express'
import RequestController from '../../controllers/requestController'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'

export const routerRequest = express.Router()

const request = new RequestController()

routerRequest.get('/', isAuthenticatedAcess, request.list)
routerRequest.get('/numero/:numero', isAuthenticatedAcess, request.listNumber)
routerRequest.get('/forn/:forn', isAuthenticatedAcess, request.listForn)
routerRequest.get('/func/:func', isAuthenticatedAcess, request.listFunc)
routerRequest.get('/detalhe/:pediCod', isAuthenticatedAcess, request.ListItems)
routerRequest.patch('/', isAuthenticatedAcess, request.approvalRequest)
routerRequest.patch('/largeScale', isAuthenticatedAcess, request.approvalLargeScale)
