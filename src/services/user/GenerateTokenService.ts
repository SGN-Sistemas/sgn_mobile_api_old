import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface IdecodeAcessToken {
  USUA_SIGLA: string;
  USUA_COD: string;
  DATABASE: string;
}

export class GenerateTokenService {
  public async execute (TOKEN:string): Promise<string> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const secretRefresh = process.env.TOKEN_SECRET_REFRESH + ''

    const {
      USUA_SIGLA,
      USUA_COD,
      DATABASE
    } = jwt.verify(TOKEN, secretRefresh) as IdecodeAcessToken

    const refreshToken = TOKEN

    const acessToken = jwt.sign(
      {
        refreshToken,
        USUA_SIGLA,
        USUA_COD,
        DATABASE
      },
      secretAcess,
      {
        expiresIn: '180s'
      }
    )

    return acessToken
  }
}
