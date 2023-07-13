/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import { TradePasswordService } from '../services/user/tradePasswordServices'
import { LoginService } from '../services/user/loginServices'
import ListUserService from '../services/user/ListServices'
import AppError from '../errors/AppError'
import { GenerateTokenService } from '../services/user/GenerateTokenService'
import { TradeTokenAppService } from '../services/user/tradeTokenApp'
import { ListUserAprovSoliService } from '../services/user/listAprovSoli'

export default class UserController {
  public async index (request: Request, response:Response): Promise<Response> {
    const user = new ListUserService()

    const userList = await user.execute()

    return response.json(userList)
  }

  public async tradePassword (
    request: Request,
    response: Response
  ): Promise<Response> {
    const tradePassword = new TradePasswordService()

    const { USUA_SIGLA, USUA_SENHA_APP } = request.body

    const user = await tradePassword.execute({
      USUA_SIGLA,
      USUA_SENHA_APP
    })

    return response.status(user.status).json(user)
  }

  public async tradeToken (
    request: Request,
    response: Response
  ): Promise<Response> {
    const tradeTokenApp = new TradeTokenAppService()

    const { USUA_SIGLA, USUA_APP_TOKEN } = request.body

    const user = await tradeTokenApp.execute({
      USUA_SIGLA,
      USUA_APP_TOKEN
    })

    return response.status(user.status).json(user)
  }

  public async login (
    request: Request,
    response: Response
  ): Promise<Response> {
    const login = new LoginService()

    const { USUA_SIGLA, USUA_SENHA_APP, DATABASE } = request.body

    const user = await login.execute({
      USUA_SIGLA,
      USUA_SENHA_APP,
      DATABASE
    })

    return response.status(user.status).json(user)
  }

  public async generateToken (
    request: Request,
    response: Response
  ): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, refreshToken] = authHeader.split(' ')

    const generateToken = new GenerateTokenService()

    const acessToken = await generateToken.execute(refreshToken)

    return response.json({ acessToken })
  }

  public async ListUserAprovSoli (
    request: Request,
    response: Response
  ): Promise<Response> {
    const listUserAprovSoliService = new ListUserAprovSoliService()
    const listUserAprovSoliServiceExec = await listUserAprovSoliService.execute()
    return response.json({ listUserAprovSoliServiceExec })
  }
}
