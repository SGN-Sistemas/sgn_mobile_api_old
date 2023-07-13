import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

interface IdecodeAcessToken {
  USUA_SIGLA: string;
  USUA_COD: string;
  DATABASE: string;
}

const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  try {
    const authHeader = request.headers.authorization

    dotenv.config()
    const secret = process.env.TOKEN_SECRET_ACESS + ''
    if (!authHeader) {
      return response.status(400).json({ message: 'Invalid Token', status: 401 })
    }
    const [, token] = authHeader.split(' ')

    const { USUA_SIGLA, USUA_COD, DATABASE } = jwt.verify(token, secret) as IdecodeAcessToken

    request.user_cod = USUA_COD
    request.user_sigla = USUA_SIGLA
    request.database = DATABASE

    return next()
  } catch {
    return response.status(400).json({ message: 'Invalid Token', status: 401 })
  }
}

export default isAuthenticated
