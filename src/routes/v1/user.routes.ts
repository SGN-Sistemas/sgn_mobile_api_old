import express from 'express'
import UserController from '../../controllers/userControllers'
import isAuthenticatedRefresh from '../../middlewares/isAuthenticatedRefresh'

export const routerUser = express.Router()

const users = new UserController()

routerUser.get('/', users.index)
routerUser.patch('/', users.tradePassword)
routerUser.post('/login', users.login)
routerUser.get('/acessToken', isAuthenticatedRefresh, users.generateToken)
