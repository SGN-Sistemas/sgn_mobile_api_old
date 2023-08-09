import express from 'express'
import UserController from '../../controllers/userControllers'
import isAuthenticatedRefresh from '../../middlewares/isAuthenticatedRefresh'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'

export const routerUser = express.Router()

const users = new UserController()

routerUser.patch('/', users.tradePassword)

routerUser.patch('/setTokenApp', isAuthenticatedRefresh, users.tradeToken)

routerUser.post('/login', users.login)

routerUser.get('/acessToken', isAuthenticatedRefresh, users.generateToken)

routerUser.get('/usuarioAprovSolic', isAuthenticatedAcess, users.ListUserAprovSoli)

routerUser.get('/modulo', isAuthenticatedAcess, users.ListVerifyModule)
// ${url}${version}/
