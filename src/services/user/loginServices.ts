import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { verifyUser } from '../../utils/verifyUser'

dotenv.config()

interface Ilogin {
  USUA_SIGLA: string;
  USUA_SENHA_APP: string;
  DATABASE: string;
}

interface ILoginReturn {
  message: string,
  error: boolean,
  status: number,
  refreshToken: string
}

export class LoginService {
  public async execute (
    {
      USUA_SIGLA,
      USUA_SENHA_APP,
      DATABASE
    } : Ilogin
  ): Promise<ILoginReturn> {
    const Tokenuuid = process.env.TOKEN_SECRET_REFRESH + ''

    const {
      message,
      error,
      status,
      userCod
    } = await verifyUser(USUA_SIGLA, USUA_SENHA_APP, DATABASE)

    if (error === true) {
      return ({
        message,
        error,
        status,
        refreshToken: ''
      })
    }
    const refreshToken = jwt.sign(
      {
        USUA_SIGLA,
        USUA_COD: userCod,
        DATABASE
      },
      Tokenuuid,
      {
        expiresIn: '1d'
      }
    )

    return ({
      message: 'Login efetuado',
      error: false,
      status: 200,
      refreshToken
    })
  }
}
