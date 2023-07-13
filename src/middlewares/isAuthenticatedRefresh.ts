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
  const authHeader = request.headers.authorization

  dotenv.config()
  const secret = process.env.TOKEN_SECRET_REFRESH + ''
  if (!authHeader) {
    return response.status(400).json({ message: 'TOKEN IS MISSING' })
  }
  const [, token] = authHeader.split(' ')
  try {
    const { USUA_SIGLA, USUA_COD, DATABASE } = jwt.verify(token, secret) as IdecodeAcessToken

    request.user_cod = USUA_COD
    request.user_sigla = USUA_SIGLA
    request.database = DATABASE
    console.log(request.database, request.user_sigla, request.user_cod)
    return next()
  } catch {
    return response.status(400).json({ message: 'TOKEN IS INVALID' })
  }
}

export default isAuthenticated
